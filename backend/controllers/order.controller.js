import asyncHandler from "../helpers/asyncHandler.js";
import { OkSuccess } from "../core/success.response.js";
import OrderService from "../services/order.service.js";
import mongoose from "mongoose";
class OrderController {
  static getCheckoutById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const order = await OrderService.getOrderById(id);
    return res.status(200).json(new OkSuccess({ data: order }));
  });
  static getOrdersByUserId = asyncHandler(async (req, res, next) => {
    const userId = req.user?._id;
    const orders = await OrderService.getOrdersByUserId(userId);
    return res.status(200).json(new OkSuccess({ data: orders }));
  });
  static getOrderStatus = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const order = await OrderService.getOrderById(id);
    return res.status(200).json(new OkSuccess({ data: order }));
  });
  static placeTempOrder = asyncHandler(async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const order = await OrderService.placeTempOrder(req.body, req.user);
      return res
        .status(200)
        .json(new OkSuccess({ data: { orderId: order._id.toString() } }));
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      next(error);
    }
  });
  static confirmedOrder = asyncHandler(async (req, res, next) => {
    const order = await OrderService.confirmedOrder(req.body, req.params);
    return res.status(200).json(new OkSuccess({ data: order }));
  });
}

export default OrderController;
