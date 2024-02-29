import express from "express";
import {
  createRole,
  deleteRole,
  getRole,
  getRoles,
  updateRole,
} from "../controllers/roleController.js";

const roleRouter = express.Router();

roleRouter.post("/addRole", createRole);
roleRouter.get("/getRoles", getRoles);
roleRouter.get("/getRole/:id", getRole);
roleRouter.put("/updateRole/:id", updateRole);
roleRouter.delete("/deleteRole/:id", deleteRole);

export default roleRouter;
