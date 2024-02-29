import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import { createToken } from "../middlewares/auth.js";

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
//* Login function for the user controller
export const login = async (req, res) => {
  const { password, username } = req.body;
  console.log("username und Passwor in LOgin_Methode", username, password);
  if (!(username && password)) {
    return res.status(400).send("All input is required");
  }

  try {
    const user = await User.findOne({ username: username });
    console.log("user aus DB", user);
    if (!user) {
      return res.stattus(400).send("invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("isMatch", isMatch);
    if (!isMatch) {
      return res.status(400).send("invalid credentials");
    }
    const userObject = user.toObject();

    delete userObject.password;
    console.log("userObject", userObject);
    const token = createToken(userObject);
    res.status(200).send({ token, user: userObject });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .send({ message: "Something went wrong. Please try again later" });
  }
};
//* CRUD operations for the user controller
<<<<<<< HEAD
//* 1. READ
export const getUsers = async (req, res) => {
  try {
    const filter = {};
    const users = await User.find(filter);
    if (users) {
      res.status(200).send(users);
    } else {
      res.status(501).send("No User found");
    }
=======
//* 1. Create
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
>>>>>>> main
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};
//* 2. Update
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { username, password });
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};
//* 3. Delete
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};
