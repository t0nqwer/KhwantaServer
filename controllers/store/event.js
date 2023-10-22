import Store from "../../models/store.js";

export const createStore = async (req, res) => {
  const { name, address, openDate, closeDate, type, image } = req.body;
  try {
    console.log(req.body);
    const CheckStore = await Store.findOne({ name });
    if (CheckStore) throw new Error("Store already exists");
    await Store.create({
      name,
      address,
      openDate,
      closeDate,
      type,
      image,
    });
    const AllStore = await Store.find();

    res.status(201).json({ message: "success", AllStore });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const getAllStore = async (req, res) => {
  try {
    const AllStore = await Store.find();
    res.status(200).json(AllStore);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
