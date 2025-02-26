import express from "express";
import { postReview } from "../../controllers/reviewsController.js";
const router = express.Router();

router.post("/product/:productId/reviews", postReview);
export default router;
