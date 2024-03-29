import Barcode from "../../models/barcode.js";
import Product from "../../models/product.js";
import Design from "../../models/design.js";
import Store from "../../models/store.js";
import Size from "../../models//designSize.js";
import Transfer from "../../models/transfer.js";
export const NewTransfer = async (req, res, next) => {
  const { from, to, status, type, _id, createAt, product } = req.body;
  console.log(req.body);
  try {
    console.log(new Date(createAt), createAt, "date", Date(createAt));
    const newTransfer = new Transfer({
      from,
      to,
      status,
      type,
      localid: _id,
      createdAt: new Date(createAt),
      product,
    });
    await newTransfer.save();
    next();
  } catch (error) {
    console.log(error);
    await Transfer.findOneAndDelete({ localid: _id });
    res.status(409).json({ message: error.message });
  }
};

export const deleteTransfer = async (req, res) => {
  const { id } = req.body;
  try {
    await Transfer.findOneAndUpdate({ localid: id }, { status: "cancel" });
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
