//* Message Schema and Model
import { Schema, model } from "mongoose";
export const messageSchema = new Schema(
  {
    sender: {
      // type: Schema.Types.ObjectId,
      // ref: "User",
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = model("Message", messageSchema);
//const Message = model("message", messageSchema, "message");
export default Message;
