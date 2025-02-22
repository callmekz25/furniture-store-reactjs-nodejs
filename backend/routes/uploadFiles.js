import express from "express";
import upload from "../middleware/multerMiddleware.js";
import uploadFiles from "../controllers/uploadController.js";
const router = express.Router();

router.post("/upload-files", upload.array("files", 10), uploadFiles);
export default router;
