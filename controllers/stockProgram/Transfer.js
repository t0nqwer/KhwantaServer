import Barcode from "../../models/barcode.js";
import Product from "../../models/product.js";
import Design from "../../models/design.js";
import Store from "../../models/store.js";
import Size from "../../models//designSize.js";
import Transfer from "../../models/transfer.js";
export const NewTransfer = async (req, res, next) => {
  const { from, to, status, type, _id, createdAt, product } = req.body;
  try {
    const newTransfer = new Transfer({
      from,
      to,
      status,
      type,
      localid: _id,
      createdAt,
      product,
    });
    await newTransfer.save();
    next();
  } catch (error) {
    console.log(error.message);
    await Transfer.findOneAndDelete({ localid: _id });
    res.status(409).json({ message: error.message });
  }
};
