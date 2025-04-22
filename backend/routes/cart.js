import express from "express";
import CartController from "../controllers/cart.controller.js";
import optionalMiddleware from "../middleware/optionalAuth.middleware.js";
import guestCartSessionMiddleware from "../middleware/guestCartSession.middleware.js";
const router = express.Router();

router.use(optionalMiddleware);
router.use(guestCartSessionMiddleware);
router.get("/cart", CartController.getUserCart);

router.patch("/cart/change", CartController.updateQuantity);
router.post("/cart", CartController.addToCart);
router.delete("/cart", CartController.removeItem);
export default router;
