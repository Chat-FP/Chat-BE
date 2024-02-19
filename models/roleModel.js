import { Schema, model } from "mongoose";
const roleSchema = new Schema({
  Label: {
    type: String,
    required: true,
    unique: true,
  },
  previlegeLevel: {
    type: Number,
    required: true,
    unique: true,
  },
  canWriteSelf: {
    type: Boolean,
    required: true,
  },
  canWriteOthers: {
    type: Boolean,
    required: true,
  },
  canRead: {
    type: Boolean,
    required: true,
  },
  canDelete: {
    type: Boolean,
    required: true,
  },
});
const Role = model("Role", roleSchema);
export default Role;
