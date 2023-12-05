import { io } from "./index.js";
import Barcode from "../models/barcode.js";
import Store from "../models/store.js";
export const AlertNewProduct = async (req, res, next) => {
  const Newproduct = req.Newproduct;
  io.emit("newProduct", Newproduct);
  next();
};
export const AlertPriceChange = async (req, res, next) => {
  const { id, price } = req.body;

  const BarcodeData = await Barcode.find({ product: id });
  BarcodeData.forEach((barcode) => {
    io.emit("priceChange", { barcode: barcode.barcode, price: price });
  });
  res.status(200).json({ message: "success" });
};
export const AlertDeleteProduct = async (req, res, next) => {
  const barcode = req.barcode;
  console.log(barcode);
  barcode.forEach((barcode) => {
    io.emit("deleteProduct", barcode);
  });
  res.status(200).json({ message: "success" });
};
export const AlertNewTransfer = async (req, res, next) => {
  const { from, to, status, type, _id, createdAt, product } = req.body;
  const StoreId = await Store.findOne({ name: to });
  console.log("noti");
  if (!StoreId.connectionId) {
    res.status(200).json({ message: "success" });
    return;
  }
  io.to(StoreId.connectionId).emit("newTransfer", {
    from,
    to,
    status,
    type,
    localid: _id,
    createdAt,
    product,
  });
  res.status(200).json({ message: "success" });
};

export const updateConnectionId = async (data, socket) => {
  await Store.updateOne({ name: data }, { connectionId: socket });
};
export const deleteConnectionId = async (socket) => {
  await Store.updateOne({ connectionId: socket }, { connectionId: "" });
};
