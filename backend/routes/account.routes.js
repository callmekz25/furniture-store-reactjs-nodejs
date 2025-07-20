import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import AccountController from "../controllers/account.controller.js";
import optionalMiddleware from "../middlewares/optionalAuth.middleware.js";
const router = express.Router();

router.post("/account/address", authMiddleware, AccountController.addAddress);
router.patch(
  "/account/address",
  authMiddleware,
  AccountController.updateAddress
);
router.get("/get-user", optionalMiddleware, AccountController.getUser);
export default router;
