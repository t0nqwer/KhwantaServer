import Stock from "../models/stock.js";
import Barcode from "../models/barcode.js";
import Bill from "../models/bill.js";
import Store from "../models/store.js";
import { scheduleJob } from "node-schedule";
import Transfer from "../models/transfer.js";

const updateStockFromSell = async () => {
  try {
    const bills = await Bill.find({ isStockUpdate: false });
    const UpdateStock = bills.map(async (bill) => {
      const store = await Store.findOne({ _id: bill.store });
      const products = bill.products.map(async (product) => {
        const update = await Stock.findOneAndUpdate(
          { product: product.barcode, store: store._id },
          { $inc: { qty: -product.qty } },
          { upsert: true, new: true }
        );

        return update;
      });

      await Promise.all(products);
      await Bill.findOneAndUpdate(
        {
          _id: bill._id,
        },
        { isStockUpdate: true }
      );
    });
    await Promise.all(UpdateStock);
  } catch (error) {
    console.log(error);
  }
};
scheduleJob("*/1 * * * *", () => {
  updateStockFromSell();
});

export const fixStock = async () => {
  await Stock.deleteMany({});
  const manufactures = await Transfer.find({ type: "manufacture" });
  const addmanufacture = manufactures.map(async (item) => {
    const store = await Store.findOne({ name: item.to });
    const CreateStock = item.product.map(async (product) => {
      const SSS = await Stock.findOneAndUpdate(
        { product: product.barcode, store: store._id },
        { $inc: { qty: product.qty } },
        { upsert: true, new: true }
      );
    });
    await Promise.all(CreateStock);
  });
  await Promise.all(addmanufacture);
  const transfers = await Transfer.find({ type: "transfer" });
  const addTransfer = transfers.map(async (item) => {
    const ToStore = await Store.findOne({ name: item.to });
    const FromStore = await Store.findOne({ name: item.from });
    const CreateStock = item.product.map(async (product) => {
      const SSS = await Stock.findOneAndUpdate(
        { product: product.barcode, store: ToStore._id },
        { $inc: { qty: product.qty } },
        { upsert: true, new: true }
      );
      const SSS2 = await Stock.findOneAndUpdate(
        { product: product.barcode, store: FromStore._id },
        { $inc: { qty: -product.qty } },
        { upsert: true, new: true }
      );
      await Promise.all([SSS, SSS2]);
    });
    await Promise.all(CreateStock);
  });
  await Promise.all(addTransfer);
  const bills = await Bill.find();
  const UpdateStock = bills.map(async (bill) => {
    await Bill.findOneAndUpdate(
      {
        _id: bill._id,
      },
      { isStockUpdate: false }
    );
  });
};

// fixStock();
