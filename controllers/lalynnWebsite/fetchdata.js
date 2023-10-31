import Product from "../../models/product.js";
import Design from "../../models/design.js";

export const fetchHeroProduct = async (req, res) => {
  try {
    const design = await Design.find({ brand: "Lalynn" }).select("_id");
    const idarray = design.map((item) => item._id);
    const products = await Product.find({ design: { $in: idarray } }).limit(6);
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const fetchProduct = async (req, res) => {};
export const fetchProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
