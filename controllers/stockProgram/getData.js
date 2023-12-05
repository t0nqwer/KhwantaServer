import Barcode from "../../models/barcode.js";
import Product from "../../models/product.js";
import Design from "../../models/design.js";
import Store from "../../models/store.js";
import Size from "../../models//designSize.js";
import { populate } from "dotenv";
import Transfer from "../../models/transfer.js";

export const startApp = async (req, res) => {
  const { name } = req.body;
  console.log(name);
  try {
    const barcodes = await Barcode.find()
      .populate("product")
      .populate("size")
      .exec();

    const adddata = barcodes.map(async (e) => {
      const fabric = await Product.findById(e.product._id)
        .populate("fabric")
        .populate("design")
        .exec();
      return { ...e._doc, product: fabric };
    });

    const stores = await Store.find();
    Promise.all(adddata).then(async (e) => {
      const product = e.map((e) => ({
        _id: e.barcode,
        name: e.product.name,
        design: e?.product?.design?.code,
        price: e.product.price,
        size: e?.size?.size,
        fabric: e.product?.fabric?.name,
        supplier: e.product.supplier,
      }));
      if (!name) return res.status(200).json({ data: product, stores });

      if (name) {
        const transfer = await Transfer.find({
          $or: [{ from: name }, { to: name }],
        });
        res.status(200).json({ data: product, stores, transfer });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
