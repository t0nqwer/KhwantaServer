import { Schema, model } from "mongoose";

const fabricPatternSchema = new Schema({
  name: { type: String, required: true },
});

const FabricPattern = model("FabricPattern", fabricPatternSchema);

export default FabricPattern;
