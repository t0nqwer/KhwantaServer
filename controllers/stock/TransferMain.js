import Transfer from "../../models/transfer.js";

export const getTransfer = async (req, res) => {
  try {
    const transfer = await Transfer.find();
    res.status(200).json(transfer);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
