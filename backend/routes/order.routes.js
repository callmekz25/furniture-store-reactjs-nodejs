import express from "express";
import OrderController from "../controllers/order.controller.js";
import optionAuthMiddleware from "../middlewares/optionalAuth.middleware.js";

const router = express.Router();

router.get(
  "/checkouts/:orderId",
  optionAuthMiddleware,
  OrderController.getCheckoutById
);
router.post("/checkouts", optionAuthMiddleware, OrderController.placeTempOrder);
router.post("/checkouts/:orderId", OrderController.confirmedOrder);
export default router;
