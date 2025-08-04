import express from "express";
import AuthController from "../controllers/auth.controller.js";
import TokenController from "../controllers/token.controller.js";
import { validateRegister } from "../middlewares/validate-register.middleware.js";
import { handleValidateErrors } from "../middlewares/handle-validate-error.middlware.js";
import { validateLogin } from "../middlewares/validate-login.middlware.js";
const router = express.Router();

router.post(
  "/signup",
  validateRegister,
  handleValidateErrors,
  AuthController.register
);
router.post("/refresh-token", TokenController.refreshToken);
router.get("/verify", AuthController.verifyEmail);
router.get("/resend-verify-email", AuthController.resendVerificationEmail);
router.post(
  "/signin",
  validateLogin,
  handleValidateErrors,
  AuthController.login
);
router.post("/logout", AuthController.logout);

export default router;
