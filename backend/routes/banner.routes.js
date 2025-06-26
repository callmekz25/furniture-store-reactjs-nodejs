import express from "express";
import { getBannersByType } from "../controllers/banner.controller.js";
const router = express.Router();

router.get("/banners/:type", getBannersByType);

export default router;
