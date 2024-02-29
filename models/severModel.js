import { Schema, model } from "mongoose";
//* Create a schema for the server
const serverSchema = new Schema({
  serverName: {
    type: String,
    required: true,
    unique: true,
  },
  serverDescription: {
    type: String,
    required: true,
  },
  serverOwner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  serverMembers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  ServerStatus: {
    type: String,
    default: "active",
  },
});
const Server = model("Server", serverSchema);
export default Server;
