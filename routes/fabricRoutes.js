import express from "express";
import { verifyData } from "../middleware/Auth.js";
import {
  AddFabric,
  AddPattern,
  AddTechnique,
  getAddFabric,
  getFabric,
} from "../controllers/fabric/fabric.js";

const router = express.Router();
router.use(verifyData);

router.route("/").get(getFabric).post(AddFabric);
router.route("/pattern").get().post(AddPattern, getAddFabric);
router.route("/weaving").get().post(AddTechnique, getAddFabric);
router.get("/getAddFabric", getAddFabric);
export default router;
