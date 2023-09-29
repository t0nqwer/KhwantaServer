import { Schema, model } from "mongoose";

const fabricColorSchema = new Schema({
  name: { type: String, required: true },
});
const FabricColor = model("FabricColor", fabricColorSchema);

export default FabricColor;
