import express from "express";
import {
  createServer,
  getServers,
  removeServer,
  updateServer,
  updateServerStatus,
} from "../controllers/serverControllers.js";

const router = express.Router();
router.post("/createServer", createServer);
router.get("/getServers", getServers);
router.delete("/removeServer", removeServer);
router.patch("/updateServer", updateServer);
/* router.patch("/updateServerStatus", updateServerStatus); */

export default router;
