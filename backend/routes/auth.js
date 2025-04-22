import express from "express";
import AuthController from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import optionalMiddleware from "../middleware/optionalAuth.middleware.js";
import TokenController from "../controllers/token.controller.js";
const router = express.Router();
// TODO: Handle refresh token, axios don't refresh token
// ERROR
router.get("/get-user", optionalMiddleware, AuthController.getUser);
router.post("/signup", AuthController.register);
router.post("/refresh-token", TokenController.refreshToken);
router.post("/signin", AuthController.login);
router.post("/logout", AuthController.logout);

export default router;
