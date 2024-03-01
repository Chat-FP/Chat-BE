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
});

//* Middlewares for the server
app.use(morgan("dev")); //logger
app.use(express.json()); //body parser
app.use(
  cors({
    /*  origin: process.env.CLIENT || "http://localhost:5173",
    allowedHeaders: "Content-Type",
    credentials: true, */
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Access-Control-Allow-Headers"],
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
