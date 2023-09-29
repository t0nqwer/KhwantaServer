import { Schema, model } from "mongoose";

const fabricTypeSchema = new Schema({
  name: { type: String, required: true },
});

const FabricType = model("FabricType", fabricTypeSchema);

export default FabricType;
