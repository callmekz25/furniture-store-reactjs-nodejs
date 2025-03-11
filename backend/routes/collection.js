import express from "express";
import { getCollections } from "../controllers/collectionController.js";
const router = express.Router();

router.get("/get-collections", getCollections);

export default router;
