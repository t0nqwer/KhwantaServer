import express from "express";
import { GetAddDesign, addDesign } from "../controllers/design/addDesign.js";
import {
  getDesignById,
  getDesigns,
} from "../controllers/design/fetchDesign.js";
import {
  AddDetailImage,
  DeleteDetailImage,
  editDesign,
} from "../controllers/design/editDesign.js";
import { verifyData } from "../middleware/Auth.js";

const router = express.Router();
router.use(verifyData);
router.route("/addDesign").get(GetAddDesign).post(addDesign);
router.route("/design").get(getDesigns);
router.route("/image").post(AddDetailImage).put(DeleteDetailImage);
router.route("/:id").get(getDesignById).put(editDesign);

export default router;
