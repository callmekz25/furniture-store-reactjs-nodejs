import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorizationMiddleware from "../middlewares/authorization.middleware.js";
import UserController from "../controllers/user.controller.js";
const router = express.Router();

router.get(
  "/users",
  authMiddleware,
  authorizationMiddleware,
  UserController.getUsers
);

export default router;
