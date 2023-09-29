import express from "express";
import {
  FetchAllClothProducts,
  FetchProductById,
  GetAddClothProduct,
  PostAddClothProduct,
} from "../controllers/product/clothProduct.js";
import {
  GetAddOtherProduct,
  PostAddOtherProduct,
} from "../controllers/product/otherProduct.js";
import {
  GetAddExampleProduct,
  PostAddExampleProduct,
} from "../controllers/product/exampleProduct.js";
const router = express.Router();

router
  .route("/addClothProduct")
  .get(GetAddClothProduct)
  .post(PostAddClothProduct);
router
  .route("/addOtherProduct")
  .get(GetAddOtherProduct)
  .post(PostAddOtherProduct);
router
  .route("/addExampleProduct")
  .get(GetAddExampleProduct)
  .post(PostAddExampleProduct);
router.route("/cloth").get(FetchAllClothProducts);
router.route("/cloth/:id").get(FetchProductById);

export default router;
