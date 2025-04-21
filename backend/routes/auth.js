import express from "express";
import {
  signIn,
  signUp,
  logOut,
  getUser,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
const router = express.Router();

router.get("/get-user", authMiddleware, getUser);
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/logout", logOut);

export default router;
