import express from "express";
import PaymentController from "../controllers/payment.controller.js";
const router = express.Router();

router.post("/payment", PaymentController.createPayment);
router.post("/payment/webhook", PaymentController.handleWebhook);

export default router;
