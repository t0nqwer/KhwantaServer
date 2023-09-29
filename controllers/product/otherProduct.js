import Supplier from "../../models/supplier.js";
import ProductCategory from "../../models/productCategory.js";
import Product from "../../models/product.js";

export const GetAddOtherProduct = async (req, res) => {
  try {
    const suppliers = await Supplier.find({});
    const categories = await ProductCategory.find({});
    const data = {
      suppliers: suppliers.map((supplier) => supplier.name),
      categories: categories.map((category) => category.name),
    };
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const PostAddOtherProduct = async (req, res) => {
  try {
    const { name, price, supplier, category } = req.body.data;
    const frontImage = req.body.image[2];
    const backImage = req.body.image[1];
    const DetailImage = req.body.image[0];
    const newProduct = new Product({
      name,
      supplier,
      category,
      price,
      frontImage,
      backImage,
      DetailImage,
      otherId: 1,
    });
    await newProduct.save();
    // console.log(newProduct);
    // throw new Error("Not implemented");
    res.status(200).json({ message: "success", id: newProduct._id });
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};
export const FetchAllOtherProducts = async (req, res) => {};
