import express from "express";
import { getChatHistory } from "../controllers/chatController.js";

const router = express.Router();

router.route("/").get(getChatHistory);
export default router;
