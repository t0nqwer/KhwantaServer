import { Schema, model } from "mongoose";

const constantSchema = new Schema({
  designCategory: Array,
  designPattern: Array,
  designBrand: Array,
  sizeDetails: Array,
  size: Array,
});

const Constant = model("Constant", constantSchema);

export default Constant;
