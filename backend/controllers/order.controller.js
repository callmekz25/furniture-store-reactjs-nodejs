import asyncHandler from "../helpers/asyncHandler.js";
import { OkSuccess } from "../core/success.response.js";
import OrderService from "../services/order.service.js";

class OrderController {
  static getCheckoutById = asyncHandler(async (req, res, next) => {
    const { orderId } = req.params;
    const order = await OrderService.getOrderById(orderId);
    return res.status(200).json(new OkSuccess({ data: order }));
  });
  static createTempOrder = asyncHandler(async (req, res, next) => {
    const order = await OrderService.createTempOrder(req.body, req.user);
    return res
      .status(200)
      .json(new OkSuccess({ data: { orderId: order._id.toString() } }));
  });
  static confirmOrder = asyncHandler(async (req, res, next) => {
    const order = await OrderService.confirmOrder(req.body, req.params);
    return res.status(200).json(new OkSuccess({ data: order }));
  });
}

export default OrderController;
