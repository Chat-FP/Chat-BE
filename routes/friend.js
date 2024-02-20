//* Route for friend related operations, such as adding and removing friends from the user's friend list
import express from "express";
import { addFriend, removeFriend } from "../controllers/friendController.js";

const router = express.Router();

router.post("/addFriend", addFriend);
router.delete("/removeFriend", removeFriend);
export default router;
