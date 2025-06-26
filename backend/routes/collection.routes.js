import express from "express";
import { getCollections } from "../controllers/collection.controller.js";
const router = express.Router();

router.get("/get-collections", getCollections);

export default router;
