import axios from "axios";
import Stock from "../../models/stock.js";
import Transfer from "../../models/transfer.js";
import Store from "../../models/store.js";

export const StockIn = async (req, res, next) => {
  console.log(req.body);
  const { from, to, status, type, _id, createdAt, product } = req.body;
  const newTransfer = new Transfer({
    from,
    to,
    status,
    type,
    localid: _id,
    createdAt,
    product,
  });
  try {
    await newTransfer.save();

    next();
  } catch (error) {
    await Transfer.findOneAndDelete({ localid: _id });
    console.log(error);

    res.status(409).json({ message: error.message });
  }
};
export const updateStock = async (req, res) => {
  const { to, _id, product } = req.body;

  const store = await Store.findOne({ name: to }).select("_id");
  const productStock = product.map((item) => ({
    product: item.barcode,
    qty: item.qty,
    store: Store._id,
  }));
  const updatbarcode = product.map((item) => item.barcode);
  const oldStock = await Stock.find({ product: { $in: updatbarcode }, store });

  try {
    const newStock = productStock.map(
      async (item) =>
        await Stock.findOneAndUpdate(
          { product: item.product, store },
          { $inc: { qty: item.qty } },
          { upsert: true, new: true }
        )
    );

    await Promise.all(newStock);
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    const newStock = oldStock.map(
      async (item) =>
        await Stock.findOneAndUpdate(
          { product: item.product, store },
          { $inc: { qty: -item.qty } },
          { upsert: true, new: true }
        )
    );
    await Promise.all(newStock);
    await Transfer.findOneAndDelete({ localid: _id });
    return res.status(409).json({ message: error.message });
  }
};
