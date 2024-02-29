//* External dependencies
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/user.js";
import roleRouter from "./routes/role.js";
import friendRouter from "./routes/friend.js";
<<<<<<< HEAD
import blockedUserRouter from "./routes/blockedUser.js";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
dotenv.config();

//import serverRouter from "./routes/server.js";
/* import { seedRoles } from "./services/seed.services.js"; */

=======
//import serverRouter from "./routes/server.js";
import blockedUserRouter from "./routes/blockedUser.js";
/* import { seedRoles } from "./services/seed.services.js"; */
>>>>>>> main
//* Port for the server
const PORT = process.env.PORT || 4000;

//* URI for the database
<<<<<<< HEAD
const dbURI = process.env.DB_URI;

const app = express();

const socketServer = http.createServer(app);

const io = new Server(socketServer, {
  cors: {
    origin: process.env.CLIENT || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
//* create the socket connection
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

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
=======
const URI = process.env.DB_URI;

const app = express();

//* mongoose connection to the database
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.79l9asu.mongodb.net/chat_app?retryWrites=true&w=majority` //`mongodb://localhost:27017/chat_app`, //URI
  )
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(err));
mongoose.connection.on("error", (err) => {
  console.log("err", err);
>>>>>>> main
});

//* Middlewares for the server
app.use(morgan("dev")); //logger
app.use(express.json()); //body parser
app.use(
  cors({
    origin: process.env.CLIENT || "http://localhost:5173",
<<<<<<< HEAD
    allowedHeaders: "Content-Type",
=======
    allowedHeaders: 'Content-Type',
>>>>>>> main
    credentials: true,
  })
);
//* Routes
app.use("/user", userRouter);
app.use("/role", roleRouter);
app.use("/friend", friendRouter);
app.use("/blockedUser", blockedUserRouter);
/* app.use("/server", serverRouter); */
//* seed the database
/* const roles = await seedRoles(); */

//* Start the server
<<<<<<< HEAD
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
=======
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
>>>>>>> main
});
