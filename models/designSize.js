import { Schema, model } from "mongoose";
import Design from "./design.js";

const detailSchema = new Schema({
  detail: { type: String, required: true },
  amount: { type: String, required: true },
});

const sizeSchema = new Schema({
  size: { type: String, required: true },
  details: [detailSchema],
  design: { type: Schema.Types.ObjectId, ref: Design, required: true },
});

const Size = model("Size", sizeSchema);

export default Size;
