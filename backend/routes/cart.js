import express from "express";
import CartController from "../controllers/cart.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import guestSessionMiddleware from "../middleware/guestSession.middleware.js";
const router = express.Router();

router.get(
  "/cart",
  authMiddleware,
  guestSessionMiddleware,
  CartController.getUserCart
);

router.patch(
  "/cart/change",
  authMiddleware,
  guestSessionMiddleware,
  CartController.updateQuantity
);
router.post(
  "/cart",
  authMiddleware,
  guestSessionMiddleware,
  CartController.addToCart
);
router.delete(
  "/cart",
  authMiddleware,
  guestSessionMiddleware,
  CartController.removeItem
);
export default router;
