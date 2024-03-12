import { Schema, model } from "mongoose";
//* Create a schema for the user
const usersSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: "Role",
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  blockedUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  session_id: [
    {
      type: [String], // wo die session id gespeichert wird
    },
  ],
});

// the userId is automatically genereated for each user.
const Users = model("users", usersSchema, "users");
export default Users;
