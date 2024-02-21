import Transfer from "../../models/transfer.js";
import moment from "moment-timezone";
import Store from "../../models/store.js";
import Stock from "../../models/stock.js";

export const getTransfer = async (req, res) => {
  try {
    const transfer = await Transfer.find({
      $or: [
        { status: "transport" },
        { $and: [{ status: "success" }, { type: "transfer" }] },
      ],
    });
    const SentData = transfer.map((e) => ({
      ...e._doc,
      createdAt: moment(e._doc.createdAt)
        .tz("Asia/Bangkok")
        .format("DD/MM/YYYY HH:mm"),
      successAt: e._doc.successAt
        ? moment(e._doc.successAt).tz("Asia/Bangkok").format("DD/MM/YYYY HH:mm")
        : null,
    }));
    res.status(200).json(SentData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const confirmTransfer = async (req, res, next) => {
  const { transferId, file } = req.body;
  try {
    const transfer = await Transfer.findById(transferId);
    const FromStore = await Store.findOne({ name: transfer.from });
    const ToStore = await Store.findOne({ name: transfer.to });
    const product = transfer.product;
    const updateProduct = product.map(async (e) => {
      const FromStock = await Stock.findOneAndUpdate(
        {
          product: e.barcode,
          store: FromStore._id,
        },
        {
          $inc: { qty: -e.qty },
        },
        {
          upsert: true,
          new: true,
        }
      );
      const ToStock = await Stock.findOneAndUpdate(
        {
          product: e.barcode,
          store: ToStore._id,
        },
        {
          $inc: { qty: e.qty },
        },
        {
          upsert: true,
          new: true,
        }
      );
      // const ToStock = await Stock.findOne({
      //   product: e.product,
      //   store: ToStore._id,
      // });
      // if (FromStock.qty >= e.qty) {
      //   FromStock.qty = FromStock.qty - e.qty;
      //   ToStock.qty = ToStock.qty + e.qty;
      //   await FromStock.save();
      //   await ToStock.save();
      // } else {
      //   res.status(404).json({ message: "Not enough product" });
      // }
    });

    await Promise.all(updateProduct);

    await Transfer.findByIdAndUpdate(transferId, {
      status: "success",
      successAt: new Date(),
      EndpointReached: true,
      EndpointReachedAt: new Date(),
      DocumentImage: file,
    });
    next();
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
