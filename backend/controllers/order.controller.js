import mongoose from "mongoose";
import Order from "../models/order.model.js";

const getCheckoutOrder = async (req, res, next) => {
  try {
    const order = req.order;
    if (!order) {
      return res.status(404).json({ mess: "Not found order" });
    }
    return res.status(200).json(order);
  } catch (error) {
    return next(error);
  }
};

const createOrderDraft = async (req, res, next) => {
  try {
    const { note, products, total_price, total_items } = req.body;
    if (!products) {
      return res.status(401).json({ mess: "Missing data" });
    }
    let orderTemp;

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
    return next(error);
  }
};
export { getCheckoutOrder, createOrderDraft };
