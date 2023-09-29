import Constant from "../../models/constant.js";
import Product from "../../models/product.js";

export const GetAddExampleProduct = async (req, res) => {
  try {
    const categories = await Constant.findOne().select("designCategory");
    const data = {
      categories: categories.designCategory,
    };
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const PostAddExampleProduct = async (req, res) => {
  try {
    const { category, name, description, price } = req.body.data;
    const frontImage = req.body.image[2];
    const backImage = req.body.image[1];
    const DetailImage = req.body.image[0];
    const newProduct = new Product({
      name,
      supplier: "Khwanta",
      category: "เสื้อผ้า",
      price,
      description,
      frontImage,
      backImage,
      DetailImage,
      clothCategory: category,
      exampleId: 1,
    });
    await newProduct.save();
    console.log(newProduct);
    // throw new Error("Not implemented");
    res.status(200).json({ message: "success", id: newProduct._id });
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};
export const FetchAllExampleProducts = async (req, res) => {};
