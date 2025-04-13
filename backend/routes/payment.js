import express from "express";

import { createMoMoPayment } from "../controllers/paymentController.js";
const router = express.Router();

router.post("/payment/momo", createMoMoPayment);

export default router;
