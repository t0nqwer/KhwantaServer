import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
});
