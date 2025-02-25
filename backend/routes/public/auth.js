import express from "express";
import {
  signIn,
  signUp,
  refreshToken,
} from "../../controllers/authController.js";
const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/refresh-token", refreshToken);
export default router;
