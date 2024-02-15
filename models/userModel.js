import { Schema, model } from "mongoose";
//* Create a schema for the user
const userSchema = new Schema({
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
    required: true,
  },
});
// the userId is automatically genereated for each user.
const User = model("User", userSchema);
export default User;
