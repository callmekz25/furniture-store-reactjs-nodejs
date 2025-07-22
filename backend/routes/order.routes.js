import express from "express";
import OrderController from "../controllers/order.controller.js";
import optionAuthMiddleware from "../middlewares/optionalAuth.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { handleValidateErrors } from "../middlewares/handle-validate-error.middlware.js";
import {
  validateConfirmedOrder,
  validatePlaceOrder,
} from "../middlewares/validate-place-order.middlware.js";
const router = express.Router();

router.get(
  "/account/orders",
  authMiddleware,
  OrderController.getOrdersByUserId
);
router.get("/account/orders/:id", authMiddleware, OrderController.getOrderById);

router.get("/orders/:id", optionAuthMiddleware, OrderController.getOrderById);
router.post(
  "/orders",
  optionAuthMiddleware,
  validatePlaceOrder,
  handleValidateErrors,
  OrderController.placeTempOrder
);
router.post(
  "/orders/:id/confirm",
  optionAuthMiddleware,
  validateConfirmedOrder,
  handleValidateErrors,
  OrderController.confirmedOrder
);

export default router;
