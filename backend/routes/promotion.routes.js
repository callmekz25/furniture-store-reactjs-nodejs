import express from "express";
import PromotionController from "../controllers/promotion.controller.js";

const router = express.Router();

router.post("/promotions", PromotionController.addPromotion);
export default router;
