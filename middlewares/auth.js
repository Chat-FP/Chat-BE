import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const createToken = (user) => {
  const token = jwt.sign(user, process.env.JWT_SECRET);
  return token;
};
const tokenVerify = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("Access Denied");
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const userFromDB = await User.findById(token.id);
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};
