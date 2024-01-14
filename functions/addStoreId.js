import Store from "../models/store.js";
import StoreID from "./generateStoreID.js";

const addStoreId = async () => {
  try {
    const stores = await Store.find();
    stores.map(async (store) => {
      if (!store.storeRandomId) {
        const id = StoreID();

        await Store.findByIdAndUpdate(store._id, { storeRandomId: id });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

addStoreId();
