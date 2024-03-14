//* External dependencies
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/user.js";
import roleRouter from "./routes/role.js";
import friendRouter from "./routes/friend.js";
import blockedUserRouter from "./routes/blockedUser.js";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
dotenv.config();
import messageRouter from "./routes/message.js";
import chatRouter from "./routes/chat.js";
import { getChatHistory } from "./controllers/chatController.js";
import { saveMessage } from "./controllers/messageController.js";

//import serverRouter from "./routes/server.js";
/* import { seedRoles } from "./services/seed.services.js"; */

//* Port for the server
const PORT = process.env.PORT || 4000;

//* URI for the database
const dbURI = process.env.DB_URI;

const app = express();

const socketServer = http.createServer(app);

const io = new Server(socketServer, {
  cors: {
    origin: process.env.CLIENT || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
const newMessages = [];

io.on("connection", (socket) => {
  console.log("a user connected with his userSocketId: ", socket.id);
  //@TODO woher wissen aus aus socket den raum? socket.rooms.map ???
  /*   const rooms = Object.keys(socket.rooms).filter((room) => room !== socket.id);
  console.log("rooms", rooms); */
  socket.on("chat message", (msg, to) => {
    //console.log("msg", msg);
    //console.log("to", to);
    io.to(to).emit("chat message", msg);
    newMessages.push({ sender: socket.id.toString(), message: msg });
    //console.log(newMessages);
    if (newMessages.length >= 3) {
      const savedMessages = saveMessage(newMessages);
      //console.log(savedMessages);
      newMessages.length = 0;
    }
  });
});

/* //* create the socket connection:
// one to one chat
io.on("connection", (socket) => {
  console.log("a user connected:" + socket.id);

  socket.on("chat message", (msg, to) => {
    io.to(to).emit("chat message", msg);
  });
  const chatHistory = getChatHistory();
  console.log("ChatHistory", chatHistory);

  socket.emit("chat history", chatHistory);
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  //one to one chat history
  socket.on("chat history", (data) => {
    const { sender, receiver } = data;
    const chatHistory = getChatHistory(sender, receiver);
    socket.emit("chat history", chatHistory);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
// one to many chat
io.on("connection", (socket) => {
  console.log("a user connected:" + socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});
 */
//* mongoose connection to the database
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log(err);
  });
mongoose.connection.on("error", (err) => {
  console.log("an error:", err);
});

//* Middlewares for the server
app.use(morgan("dev")); //logger
app.use(express.json()); //body parser
app.use(
  cors({
    origin: process.env.CLIENT || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Access-Control-Allow-Origin"],
    credentials: true,
  })
);
//* Routes
app.use("/user", userRouter);
app.use("/role", roleRouter);
app.use("/friend", friendRouter);
app.use("/blockedUser", blockedUserRouter);
app.use("/message", messageRouter);
app.use("/chatHistory", chatRouter);
/* app.use("/server", serverRouter); */
//* seed the database
/* const roles = await seedRoles(); */
// chatHistory

//* Start the server
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`HTTP Server is running on port ${PORT}`);
  }
});

socketServer.listen(4001, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Socket server is running on port 4001`);
  }
});
