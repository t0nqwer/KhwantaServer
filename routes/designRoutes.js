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
import { DeleteDesign } from "../controllers/design/deleteDesign.js";

const router = express.Router();
router.use(verifyData);
router.route("/addDesign").get(GetAddDesign).post(addDesign);
router.route("/design").get(getDesigns).delete(DeleteDesign);
router.route("/image").post(AddDetailImage).put(DeleteDetailImage);
router.route("/:id").get(getDesignById).put(editDesign).delete(DeleteDesign);

export default router;
