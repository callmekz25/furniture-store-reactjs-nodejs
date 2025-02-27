import express from "express";
import { addCart, getCart } from "../../controllers/cartController.js";
import optionalAuthMiddleware from "../../middleware/optionalAuthMiddleware.js";
import checkCartIdOrUserMiddleware from "../../middleware/checkCartIdOrUserMiddleware.js";
const router = express.Router();

router.post(
  "/cart",
  optionalAuthMiddleware,
  checkCartIdOrUserMiddleware,
  addCart
);
router.get(
  "/cart",
  optionalAuthMiddleware,
  checkCartIdOrUserMiddleware,
  getCart
);
export default router;
