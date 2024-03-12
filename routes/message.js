//* routes for message
import express from "express";
import {
  sendMessage,
  deleteMessage,
  updateMessage,
} from "../controllers/messageController.js";
import protect from "../middlewares/protect.js";

const router = express.Router();

router.route("/").post(sendMessage);
router.route("/:id").delete(deleteMessage).patch(updateMessage);

export default router;

//  protect middleware is a function that checks if the user is logged in. If the user is logged in, the request is allowed to proceed. If the user is not logged in, the request is rejected with a 401 status code. The protect middleware is used to protect routes that require the user to be logged in, such as sending and receiving messages.
