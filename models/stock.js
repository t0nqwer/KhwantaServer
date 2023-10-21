import { Schema, model } from "mongoose";

const stockSchema = new Schema({
  product: { type: String, required: true },
  qty: { type: Number, required: true },
  store: { type: Schema.Types.ObjectId, ref: "Store" },
});
const Stock = model("Stock", stockSchema);
export default Stock;
