//* External dependencies
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
//* Port for the server
const PORT = process.env.PORT || 4000;

//* URI for the database
const URI = process.env.DB_URI;

const app = express();

//* mongoose connection to the database
mongoose
  .connect(URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(err));
mongoose.connection.on("error", (err) => {
  console.log("err", err);
});

//* Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
