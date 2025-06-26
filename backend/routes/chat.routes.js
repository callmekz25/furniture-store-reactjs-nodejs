import express from "express";
import ChatController from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/chat", ChatController.sendMessage);
export default router;
