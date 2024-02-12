import Product from "../../models/product.js";
import Store from "../../models/store.js";
import Transfer from "../../models/transfer.js";
import Barcode from "../../models/barcode.js";

export const getCreateTransfers = async (req, res) => {
  try {
    const stores = await Store.find();
    const barcodes = await Barcode.find()
      .populate("product")
      .populate("size")
      .exec();
    const notExpireStore = stores.filter(
      (store) => store.closeDate > Date.now() || store.closeDate === null
    );
    res.status(200).json({ stores: notExpireStore, barcodes });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getStorelist = async (req, res) => {
  try {
    const stores = await Store.find();
    const notExpireStore = stores.filter(
      (store) => store.closeDate > Date.now() || store.closeDate === null
    );
    res.status(200).json(notExpireStore);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
