import express from "express";
import { getCategories } from "../../controllers/categoryController.js";
const router = express.Router();

router.get("/categories", getCategories);

export default router;
