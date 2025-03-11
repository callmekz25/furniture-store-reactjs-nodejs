import express from "express";
import {
  postReview,
  getReviewsByProductId,
} from "../controllers/reviewController.js";
const router = express.Router();

router.post("/products/:productId/reviews", postReview);
router.get("/products/:productId/reviews", getReviewsByProductId);
export default router;
