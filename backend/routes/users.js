import express from "express";
import { SignIn, SignUp } from "../controllers/usersController.js";
const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);
export default router;
