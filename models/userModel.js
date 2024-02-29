import { Schema, model } from "mongoose";
//* Create a schema for the user
<<<<<<< HEAD
const usersSchema = new Schema({
=======
const userSchema = new Schema({
>>>>>>> main
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
});
// the userId is automatically genereated for each user.
<<<<<<< HEAD
const Users = model("users", usersSchema, "users");
export default Users;
=======
const User = model("User", userSchema);
export default User;
>>>>>>> main
