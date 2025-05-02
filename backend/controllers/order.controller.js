import mongoose from "mongoose";
import Order from "../models/order.model.js";
import asyncHandler from "../helpers/asyncHandler.js";
import { OkSuccess } from "../core/success.response.js";
const getCheckoutOrder = asyncHandler(async (req, res, next) => {
  const order = req.order;
  if (!order) {
    return res.status(404).json({ mess: "Not found order" });
  }
  return res.status(200).json(new OkSuccess({ data: order }));
});

const createOrderDraft = asyncHandler(async (req, res, next) => {
  const { note, products, total_price, total_items } = req.body;
  if (!products) {
    return res.status(401).json({ mess: "Missing data" });
  }
  let orderTemp;

  if (req.user) {
    orderTemp = new Order({
      order_code: "31258",
      userId: req.user.userId,
      order_info: {
        name: "",
        email: "",
        phoneNumber: "",
        note: "",
        address: "",
        province: "",
        district: "",
        ward: "",
      },
      products: products,
      order_status: "pending",
      payment: {
        payment_status: false,
      },
      total_price,
      total_items,
    });
  } else {
    orderTemp = new Order({
      order_code: "31258",
      order_info: {
        name: "",
        email: "",
        phoneNumber: "",
        note: "",
        address: "",
        province: "",
        district: "",
        ward: "",
      },
      products: products,
      order_status: "pending",
      payment: {
        payment_status: false,
      },
      total_price,
      total_items,
    });
  }

  await orderTemp.save();
  return res
    .status(200)
    .json(new OkSuccess({ data: { orderId: orderTemp._id.toString() } }));
});
export { getCheckoutOrder, createOrderDraft };
