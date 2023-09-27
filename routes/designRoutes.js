import express from "express";
import { GetAddDesign, addDesign } from "../controllers/design/addDesign.js";
import {
  getDesignById,
  getDesigns,
} from "../controllers/design/fetchDesign.js";

const router = express.Router();

router.route("/addDesign").get(GetAddDesign).post(addDesign);
router.route("/design").get(getDesigns);
router.route("/:id").get(getDesignById);

export default router;
