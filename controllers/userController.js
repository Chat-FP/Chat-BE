import bcrypt from "bcrypt";
import User from "../models/userModel.js";

import { validationResult } from "express-validator";

export const register = async (req, res) => {
  const errors = validationResult(req); // check for errors
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() }); // return errors
  }
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res
        .status(400)
        .send({ message: "Username already exists with this username" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).send({ user });
  } catch (error) {
    console.log(error);
  }
};
