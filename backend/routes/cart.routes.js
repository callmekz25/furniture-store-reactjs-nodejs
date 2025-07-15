import express from "express";
import CartController from "../controllers/cart.controller.js";
import optionalMiddleware from "../middlewares/optionalAuth.middleware.js";
import guestCartSessionMiddleware from "../middlewares/guestCartSession.middleware.js";
import {
  validateAddToCart,
  validateDeleteItemInCart,
  validateUpdateItemInCart,
} from "../middlewares/validate-cart.middlware.js";
import { handleValidateErrors } from "../middlewares/handle-validate-error.middlware.js";
const router = express.Router();

router.use(optionalMiddleware);
router.use(guestCartSessionMiddleware);
router.get("/cart", CartController.getUserCart);

router.patch(
  "/cart",
  validateUpdateItemInCart,
  handleValidateErrors,
  CartController.updateQuantity
);
router.post(
  "/cart",
  validateAddToCart,
  handleValidateErrors,
  CartController.addToCart
);
router.post(
  "/cart/remove",
  validateDeleteItemInCart,
  handleValidateErrors,
  CartController.removeItem
);
export default router;
