import Design from "../../models/design.js";
import Fabric from "../../models/fabric.js";
import Product from "../../models/product.js";
import Size from "../../models/designSize.js";
import Barcode from "../../models/barcode.js";

export const ChangeProductPrice = async (req, res) => {
  const { id, price } = req.body;
  try {
    const product = await Product.findOneAndUpdate(
      { _id: id },
      { $set: { price: price } }
    );
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const AddDetailImage = async (req, res) => {
  const { id, img } = req.body;
  console.log(id);
  try {
    await Product.findOneAndUpdate(
      { _id: id },
      { $push: { DetailImage: img } }
    );
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
export const DeleteDetailImage = async (req, res) => {
  const { id, img } = req.body;
  try {
    await Product.findOneAndUpdate(
      { _id: id },
      { $pull: { DetailImage: img } }
    );
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
