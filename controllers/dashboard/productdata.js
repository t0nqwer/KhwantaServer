import Design from "../../models/design.js";
import Product from "../../models/product.js";
import Store from "../../models/store.js";

export const firstSection = async (req, res) => {
  try {
    const design = await Design.find().countDocuments();
    const product = await Product.countDocuments();
    const store = await Store.countDocuments();
    console.log(design, product, store);
    res.status(200).json({ design, product, store });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
