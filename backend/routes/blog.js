import express from "express";
import {
  getBlogByCategoryAndSlug,
  getBlogs,
  postBlog,
  uploadImageBlog,
} from "../controllers/blogController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizationMiddlware from "../middleware/authorizationMiddleware.js";
import uploadMiddleware from "../middleware/multerMiddleware.js";
const router = express.Router();

router.get("/blogs", getBlogs);
router.get("/blogs/:category/:slug", getBlogByCategoryAndSlug);
router.post(
  "/upload-image-blog",
  authMiddleware,
  authorizationMiddlware,
  uploadMiddleware,
  uploadImageBlog
);
router.post(
  "/post-blog",
  authMiddleware,
  authorizationMiddlware,
  uploadMiddleware,
  postBlog
);
export default router;
