import mongoose from "mongoose";
import Order from "../models/order.model.js";
import asyncHandler from "../helpers/asyncHandler.js";

const getCheckoutOrder = asyncHandler(async (req, res, next) => {
  const order = req.order;
  if (!order) {
    return res.status(404).json({ mess: "Not found order" });
  }
  return res.status(200).json(order);
});

const createOrderDraft = asyncHandler(async (req, res, next) => {
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
});
export { getCheckoutOrder, createOrderDraft };
