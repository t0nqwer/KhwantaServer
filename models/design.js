import { Schema, model } from "mongoose";

const detailImageSchema = new Schema({
  url: { type: String, required: true },
});

const designSchema = new Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  pattern: { type: String, required: true },
  FrontImage: { type: String, required: true },
  BackImage: { type: String, required: true },
  DetailImage: [detailImageSchema],
});

const Design = model("Design", designSchema);

export default Design;
