import express from "express";
import {
  addProduct,
  deleteProduct,
  getProductBySlug,
  getProducts,
} from "../../controllers/productController.js";
import authMiddleware from "../../middleware/authMiddleware.js";
import upload from "../../middleware/multerMiddleware.js";
const router = express.Router();

router.get("/products", getProducts);
router.get("/product/:slug", authMiddleware, getProductBySlug);
router.post("/product", upload.array("files", 10), addProduct);
router.delete("/product", deleteProduct);
export default router;
