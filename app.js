//* External dependencies
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/user.js";
//* Port for the server
const PORT = process.env.PORT || 4000;

//* URI for the database
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
});

//* Middlewares for the server
app.use(morgan("dev")); //logger
app.use(express.json()); //body parser
app.use(
  cors({
    origin: process.env.CLIENT || "http://localhost:5173",
  })
); //cors

//* Routes
app.use("/user", userRouter);

//* Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
