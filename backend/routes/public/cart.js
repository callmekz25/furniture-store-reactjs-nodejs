import express from "express";
import {
  addCart,
  getCart,
  removeFromCart,
} from "../../controllers/cartController.js";
import authMiddleware from "../../middleware/authMiddleware.js";
import checkCartIdOrUserMiddleware from "../../middleware/checkCartIdOrUserMiddleware.js";
const router = express.Router();

router.get("/cart", authMiddleware, checkCartIdOrUserMiddleware, getCart);
router.post("/cart", authMiddleware, checkCartIdOrUserMiddleware, addCart);
router.delete(
  "/cart/:productId",
  authMiddleware,
  checkCartIdOrUserMiddleware,
  removeFromCart
);
export default router;
