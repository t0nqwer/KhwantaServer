import { Schema, model } from "mongoose";

const fabricSchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  weaving: { type: String, required: true },
  type: { type: String, required: true },
  pattern: { type: String },
  id: { type: Number, required: true },
});

const Fabric = model("Fabric", fabricSchema);

export default Fabric;
