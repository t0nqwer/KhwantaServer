import { Schema, model } from "mongoose";

const fabricTechniqueSchema = new Schema({
  name: { type: String, required: true },
});
const FabricTechnique = model("FabricTechnique", fabricTechniqueSchema);

export default FabricTechnique;
