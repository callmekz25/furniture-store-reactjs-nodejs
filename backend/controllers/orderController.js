import mongoose from "mongoose";
import Order from "../models/orderModel.js";

const createOrder = async (req, res) => {
  try {
    const { name, email, phoneNumber } = req.body;
  } catch (error) {}
};

const getCheckoutOrder = async (req, res) => {
  try {
    const order = req.order;
    if (!order) {
      return res.status(404).json({ mess: "Not found order" });
    }
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ mess: error });
  }
};

const createOrderDraft = async (req, res) => {
  try {
    const { note, products, total_price, total_items } = req.body;
    if (!products) {
      return res.status(401).json({ mess: "Missing data" });
    }
    let orderTemp;
    console.log(req.user);

    if (req.user) {
      orderTemp = new Order({
        userId: req.user.userId,
        products: products,
        note: note ?? "",
        total_price,
        total_items,
      });
    } else {
      orderTemp = new Order({
        products: products,
        note: note ?? "",
        total_price,
        total_items,
      });
    }

    await orderTemp.save();
    return res.status(200).json({ orderId: orderTemp._id.toString() });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ mess: error });
  }
};
export { getCheckoutOrder, createOrderDraft };
