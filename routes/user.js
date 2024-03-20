import express from "express";
import {
  deleteUser,
  getUsers,
  login,
  register,
  updateUser,
  logout,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", getUsers);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/logout");

export default router;
