import express from "express";
import PromotionController from "../controllers/promotion.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorizationMiddleware from "../middlewares/authorization.middleware.js";

const router = express.Router();

router.get(
  "/promotions",
  authMiddleware,
  authorizationMiddleware,
  PromotionController.getPromotions
);
router.post("/promotions", PromotionController.addPromotion);
export default router;
