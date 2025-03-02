import express from "express";
import {
  addCart,
  getCart,
  removeFromCart,
} from "../../controllers/cartController.js";
import optionalAuthMiddleware from "../../middleware/optionalAuthMiddleware.js";
import checkCartIdOrUserMiddleware from "../../middleware/checkCartIdOrUserMiddleware.js";
const router = express.Router();

router.get(
  "/cart",
  optionalAuthMiddleware,
  checkCartIdOrUserMiddleware,
  getCart
);
router.post(
  "/cart",
  optionalAuthMiddleware,
  checkCartIdOrUserMiddleware,
  addCart
);
router.delete(
  "/cart/:productId",
  optionalAuthMiddleware,
  checkCartIdOrUserMiddleware,
  removeFromCart
);
export default router;
