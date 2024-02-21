import Stock from "../../models/stock.js";

export const getStockByShop = async (req, res) => {
  try {
    const stock = await Stock.find().populate("store");
    const group = stock.reduce((acc, cur) => {
      if (!acc[cur.store.name]) {
        acc[cur.store.name] = [];
      }
      acc[cur.store.name].push(cur);
      return acc;
    }, {});
    res.status(200).json(group);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getStockByProduct = async (req, res) => {
  try {
    const stock = await Stock.find().populate("store");
    const group = stock.reduce((acc, cur) => {
      if (!acc[cur.product]) {
        acc[cur.product] = [];
      }
      acc[cur.product].push(cur);
      return acc;
    }, {});
    res.status(200).json(group);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
