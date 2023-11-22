// import { io } from "./index.js";
import Barcode from "../models/barcode.js";

export const AlertNewProduct = async (req, res, next) => {
  // const Newproduct = req.Newproduct;
  // io.emit("newProduct", Newproduct);
  // next();
};
export const AlertPriceChange = async (req, res, next) => {
  // const { id, price } = req.body;
  // const BarcodeData = await Barcode.find({ product: id });
  // BarcodeData.forEach((barcode) => {
  //   io.emit("priceChange", { barcode: barcode.barcode, price: price });
  // });
  // res.status(200).json({ message: "success" });
};
export const AlertDeleteProduct = async (req, res, next) => {
  // const barcode = req.barcode;
  // console.log(barcode);
  // barcode.forEach((barcode) => {
  //   io.emit("deleteProduct", barcode);
  // });
  // res.status(200).json({ message: "success" });
};
