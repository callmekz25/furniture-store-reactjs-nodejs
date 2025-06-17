import { OkSuccess } from "../core/success.response.js";
import asyncHandler from "../helpers/asyncHandler.js";
import PaymentFactory from "../services/payment.factory.js";
import OrderService from "../services/order.service.js";
class PaymentController {
  static createPayment = asyncHandler(async (req, res, next) => {
    const { orderId, paymentMethod } = req.body;
    await OrderService.confirmedOrder(req.body);
    const paymentService = PaymentFactory.getService(paymentMethod);
    const result = paymentService.createPayment(orderId);
    return res.status(200).json(new OkSuccess({ result }));
  });
  static handleWebhook = asyncHandler(async (req, res, next) => {
    const { paymentMethod } = req.query;
    const paymentService = PaymentFactory.getService(paymentMethod);
    await paymentService.handleWebhook(req.body);
    return res.status(200).json(new OkSuccess({ message: "Successfully" }));
  });
}
export default PaymentController;
