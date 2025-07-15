import express from "express";
import PaymentController from "../controllers/payment.controller.js";
import { handleValidateErrors } from "../middlewares/handle-validate-error.middlware.js";
import { validateConfirmedOrder } from "../middlewares/validate-place-order.middlware.js";
const router = express.Router();

router.post(
  "/payment/:id",
  validateConfirmedOrder,
  handleValidateErrors,
  PaymentController.createPayment
);
router.post("/payment/webhook", PaymentController.handleWebhook);

export default router;
