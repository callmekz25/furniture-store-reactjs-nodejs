import express from "express";
import {
  addProduct,
  deleteProduct,
  getProductBySlug,
  getProducts,
  getProductsByCollectionOrCategory,
  getProductsByCollectionWithLimit,
  getRelatedProducts,
} from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizationMiddleware from "../middleware/authorizationMiddleware.js";
import uploadMiddleware from "../middleware/multerMiddleware.js";
const router = express.Router();

router.get("/collections/:slug", getProductsByCollectionOrCategory);

router.get("/products/:slug", getProductBySlug);
router.get("/products/collection/:slug", getProductsByCollectionWithLimit);
router.get("/products/category/:category", getRelatedProducts);
// router.get("/products", authMiddleware, authorizationMiddleware, getProducts);
router.get("/products", getProducts);
router.post("/product", uploadMiddleware, addProduct);
router.delete("/product", deleteProduct);
export default router;
