import express from "express";

import PaymentController from "../controllers/payment.controller.js";
const router = express.Router();

router.post("/payment/momo", PaymentController.createMomoPayment);

export default router;
