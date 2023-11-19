import Design from "../../models/design.js";
import Fabric from "../../models/fabric.js";
import Product from "../../models/product.js";
import Size from "../../models/designSize.js";
import Stock from "../../models/stock.js";
import Barcode from "../../models/barcode.js";
import { storage } from "../../firebase.js";
import { ref, deleteObject } from "firebase/storage";

export const ChangeProductPrice = async (req, res, next) => {
  const { id, price } = req.body;
  try {
    const product = await Product.findOneAndUpdate(
      { _id: id },
      { $set: { price: price } }
    );
    req.result = { message: "success" };

    next();
    // res.status(200).json({ message: "success" });
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

export const DeleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    console.log(id);
    const BarcodeList = await Barcode.find({ product: id }).select("barcode");
    const barcode = BarcodeList.map((item) => item.barcode);
    const CheckStock = await Stock.find({ product: { $in: barcode } });
    if (CheckStock.length > 0) {
      res.status(409).json({ message: "มีสินค้าในสต๊อก ไม่สามารถลบได้" });
    } else {
      const ProductData = await Product.findOne({ _id: id });
      console.log(ProductData);
      const detail = ProductData?.DetailImage ? ProductData?.DetailImage : [];
      let imageList = [
        ProductData.frontImage,
        ProductData.backImage,
        ...detail,
        ProductData?.frontthumbnail,
      ];
      console.log(imageList);
      const deleteImage = imageList.map(async (item) => {
        if (!item) return;
        console.log(item);
        try {
          const imageRef = ref(storage, item);
          await deleteObject(imageRef);
        } catch (error) {}
      });
      await Promise.all(deleteImage);
      await Barcode.deleteMany({ product: id });
      await Product.findOneAndDelete({ _id: id });

      req.barcode = barcode;
      next();
      // res.status(200).json({ message: "success" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
