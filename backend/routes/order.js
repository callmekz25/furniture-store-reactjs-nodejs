import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import validateCheckoutParam from "../middleware/verifyCheckoutParamMiddleware.js";
import {
  createOrderDraft,
  getCheckoutOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.get(
  "/checkouts/:orderId",
  authMiddleware,
  validateCheckoutParam,
  getCheckoutOrder
);
router.post("/checkouts", authMiddleware, createOrderDraft);

export default router;
