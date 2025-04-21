import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import verifyCheckoutParam from "../middleware/verifyCheckoutParam.middleware.js";
import {
  createOrderDraft,
  getCheckoutOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

router.get(
  "/checkouts/:orderId",
  authMiddleware,
  verifyCheckoutParam,
  getCheckoutOrder
);
router.post("/checkouts", authMiddleware, createOrderDraft);

export default router;
