import Store from "../models/store.js";
const makeStoreID = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter++;
  }

  return result;
};

export default function StoreID() {
  let id;
  for (let i = 0; i >= 0; i++) {
    const generateID = makeStoreID(3);

    id = generateID;
    const store = Store.findOne({ storeRandomId: generateID });
    if (!store) {
      break;
    }
  }

  return id;
}
