import { Schema, model } from "mongoose";

const storeSchema = new Schema({
  storeRandomId: { type: String },
  name: { type: String, required: true },
  address: { type: String, required: true },
  openDate: { type: Date, default: Date.now },
  closeDate: { type: Date },
  type: { type: String, required: true, enum: ["store", "event", "warehouse"] },
  image: { type: String },
  connectionId: { type: String },
});

const Store = model("Store", storeSchema);
export default Store;
