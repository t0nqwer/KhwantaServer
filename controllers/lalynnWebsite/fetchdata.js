import Product from "../../models/product";

export const fetchHeroProduct = async (req, res) => {
  try {
    const products = await Product.find().limit(6);
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
