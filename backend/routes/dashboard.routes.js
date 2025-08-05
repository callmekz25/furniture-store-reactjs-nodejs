import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorizationMiddleware from "../middlewares/authorization.middleware.js";
import DashboardController from "../controllers/dashboard.controller.js";
const router = express.Router();

router.get(
  "/summary",
  authMiddleware,
  authorizationMiddleware,
  DashboardController.getSummary
);
export default router;
