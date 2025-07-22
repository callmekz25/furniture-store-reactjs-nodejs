import { OkSuccess } from "../core/success.response.js";
import asyncHandler from "../helpers/asyncHandler.js";
import PaymentFactory from "../services/payment.factory.js";
class PaymentController {
  static createPayment = asyncHandler(async (req, res, next) => {
    const { paymentMethod } = req.query;
    const { id } = req.params;
    const paymentService = PaymentFactory.getService(paymentMethod);
    const result = await paymentService.createPayment(id);
    return res.status(200).json(new OkSuccess({ data: result }));
  });
  static handleWebhook = asyncHandler(async (req, res, next) => {
    const { paymentMethod } = req.query;
    console.log("Webhook received", req.url);

    console.log(req.body);

    const paymentService = PaymentFactory.getService(paymentMethod);
    await paymentService.handleWebhook(req.body);
    return res.status(200).json(new OkSuccess({ message: "Successful!" }));
  });
}
export default PaymentController;
