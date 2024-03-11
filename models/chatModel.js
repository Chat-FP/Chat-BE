import { Schema, model } from "mongoose";
import { messageSchema } from "./messageModel.js";
const chatSchema = new Schema(
  {
    session_id: {
      type: String,
      required: true,
    },

    userids: {
      type: [String],
      required: true,
    },
    messages: [messageSchema],
  },
  { timestamps: true }
);
const Chat = model("Chat", chatSchema, "chat");
export default Chat;
