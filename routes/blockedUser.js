//* blocked user routes
import express from "express";
import {
  addBlockedUser,
  removeBlockedUser,
} from "../controllers/blockedUserController.js";
const router = express.Router();
router.post("/addBlockedUser", addBlockedUser);
router.delete("/removeBlockedUser", removeBlockedUser);
export default router;
