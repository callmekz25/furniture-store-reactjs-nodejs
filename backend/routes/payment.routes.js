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

export default router;
