import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import OrderController from "../controllers/order.controller.js";

const router = express.Router();

router.get(
  "/checkouts/:orderId",
  authMiddleware,
  OrderController.getCheckoutById
);
router.post("/checkouts", authMiddleware, OrderController.createTempOrder);
router.post("/checkouts/:orderId", OrderController.confirmOrder);
export default router;
