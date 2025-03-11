import express from "express";
import {
  signIn,
  signUp,
  logOut,
  getUser,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/get-user", authMiddleware, getUser);
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/logout", logOut);

export default router;
