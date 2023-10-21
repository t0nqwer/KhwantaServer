import Fabric from "../../models/fabric.js";
import FabricColor from "../../models/fabricColor.js";
import FabricType from "../../models/fabricType.js";
import FabricPattern from "../../models/fabricPattern.js";
import FabricTechnique from "../../models/fabricTechnique.js";
import Product from "../../models/product.js";

export const getAddFabric = async (req, res) => {
  try {
    const fabric = await Fabric.find();
    const fabricColor = await FabricColor.find();
    const fabricType = await FabricType.find();
    const fabricPattern = await FabricPattern.find();
    const fabricTechnique = await FabricTechnique.find();

    res.status(200).json({
      fabric,
      fabricColor: fabricColor.map((item) => item.name),
      fabricType: fabricType.map((item) => item.name),
      fabricPattern: fabricPattern.map((item) => item.name),
      fabricTechnique: fabricTechnique.map((item) => item.name),
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getFabric = async (req, res) => {
  try {
    const fabric = await Fabric.find();
    const fabricProduct = fabric.map(async (item) => {
      const Proc = await Product.find({ fabric: item._id });
      return { ...item._doc, product: Proc.length };
    });
    const awaitFabricProduct = await Promise.all(fabricProduct);
    res.status(200).json(awaitFabricProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const AddFabric = async (req, res) => {
  const { color, type, pattern, weaving } = req.body;
  try {
    const fabric = await Fabric.findOne().sort({ id: -1 }).select("id");
    const name = `ผ้า${type}${weaving}${
      color === "เคมี" ? "" : color === "eco-printed" ? color : `ย้อมสี${color}`
    }${pattern ? pattern : ""}`;
    console.log(name, color, type, pattern, weaving);
    const newFabric = new Fabric({
      id: fabric ? fabric.id + 1 : 1,
      name,
      color,
      type,
      pattern,
      weaving,
    });
    await newFabric.save();
    res.status(201).json({ message: "success" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const AddPattern = async (req, res, next) => {
  const { name } = req.body;
  try {
    const newPattern = new FabricPattern({ name });
    await newPattern.save();
    next();
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const AddTechnique = async (req, res, next) => {
  const { name } = req.body;
  try {
    const newTechnique = new FabricTechnique({ name });
    await newTechnique.save();
    next();
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
