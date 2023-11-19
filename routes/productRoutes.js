import express from "express";
import {
  FetchAllClothProducts,
  FetchProductById,
  GetAddClothProduct,
  PostAddClothProduct,
} from "../controllers/product/clothProduct.js";
import {
  FetchAllOtherProducts,
  FetchOtherProductById,
  GetAddOtherProduct,
  PostAddOtherProduct,
} from "../controllers/product/otherProduct.js";
import {
  FetchAllExampleProducts,
  FetchExampleProductById,
  GetAddExampleProduct,
  PostAddExampleProduct,
} from "../controllers/product/exampleProduct.js";
import { verifyData } from "../middleware/Auth.js";
import {
  AddDetailImage,
  ChangeProductPrice,
  DeleteDetailImage,
  DeleteProduct,
} from "../controllers/product/Product.js";
import {
  AlertNewProduct,
  AlertPriceChange,
  AlertDeleteProduct,
} from "../socket.io/Func.js";
import { createProductThumbnail } from "../functions/thumbnailCreate.js";
const router = express.Router();
router.use(verifyData);

router
  .route("/addClothProduct")
  .get(GetAddClothProduct)
  .post(PostAddClothProduct, AlertNewProduct, createProductThumbnail);
router
  .route("/addOtherProduct")
  .get(GetAddOtherProduct)
  .post(PostAddOtherProduct, AlertNewProduct, createProductThumbnail);
router
  .route("/addExampleProduct")
  .get(GetAddExampleProduct)
  .post(PostAddExampleProduct, AlertNewProduct, createProductThumbnail);
router.route("/cloth").get(FetchAllClothProducts);
router.route("/other").get(FetchAllOtherProducts);
router.route("/example").get(FetchAllExampleProducts);
router.route("/cloth/:id").get(FetchProductById);
router.route("/other/:id").get(FetchOtherProductById);
router.route("/example/:id").get(FetchExampleProductById);
router.put("/updatePrice", ChangeProductPrice, AlertPriceChange);
router.route("/detailImage").post(AddDetailImage).put(DeleteDetailImage);
router.delete("/:id", DeleteProduct, AlertDeleteProduct);

export default router;
