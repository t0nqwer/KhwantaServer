import { Schema, model } from "mongoose";

const barcodeSchema = new Schema({
  barcode: { type: String, required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  size: { type: Schema.Types.ObjectId, ref: "Size" },
  createdAt: { type: Date, default: Date.now },
});

const Barcode = model("Barcode", barcodeSchema);
export default Barcode;
