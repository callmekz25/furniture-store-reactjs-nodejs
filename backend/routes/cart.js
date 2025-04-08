import express from "express";
import {
  addCart,
  getCart,
  removeFromCart,
  updateQuantity,
} from "../controllers/cartController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import checkCartIdOrUserMiddleware from "../middleware/checkCartIdOrUserMiddleware.js";
const router = express.Router();

router.get("/cart", authMiddleware, checkCartIdOrUserMiddleware, getCart);
router.patch(
  "/cart/change",
  authMiddleware,
  checkCartIdOrUserMiddleware,
  updateQuantity
);
router.post("/cart", authMiddleware, checkCartIdOrUserMiddleware, addCart);
router.delete(
  "/cart",
  authMiddleware,
  checkCartIdOrUserMiddleware,
  removeFromCart
);
export default router;
