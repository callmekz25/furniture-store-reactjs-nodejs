import express from "express";
import OrderController from "../controllers/order.controller.js";
import optionAuthMiddleware from "../middlewares/optionalAuth.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { handleValidateErrors } from "../middlewares/handle-validate-error.middlware.js";
import { validatePlaceOrder } from "../middlewares/validate-place-order.middlware.js";
const router = express.Router();

router.get(
  "/account/orders",
  authMiddleware,
  OrderController.getOrdersByUserId
);

router.get(
  "/checkouts/:id",
  optionAuthMiddleware,
  OrderController.getCheckoutById
);
router.post(
  "/checkouts",
  optionAuthMiddleware,
  validatePlaceOrder,
  handleValidateErrors,
  OrderController.placeTempOrder
);

export default router;
