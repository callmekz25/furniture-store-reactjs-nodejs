import { OkSuccess } from "../core/success.response.js";
import asyncHandler from "../helpers/asyncHandler.js";
import PaymentService from "../services/payment.service.js";

class PaymentController {
  static createMomoPayment = asyncHandler(async (req, res, next) => {
    const data = await PaymentService.createMomoPayment(req.body);
    return res.status(200).json(new OkSuccess({ data }));
  });
}
export default PaymentController;
