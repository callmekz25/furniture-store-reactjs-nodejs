import express from "express";
import {
  addProduct,
  deleteProduct,
  getProductBySlug,
  getProducts,
  getProductsByCollectionOrCategory,
  getProductsByCollection,
  getRelatedProducts,
  getProductById,
  getProductBySearchTerm,
} from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizationMiddleware from "../middleware/authorizationMiddleware.js";
import uploadMiddleware from "../middleware/multerMiddleware.js";
const router = express.Router();

router.get("/collections/:slug", getProductsByCollectionOrCategory);

router.get("/products/:slug", getProductBySlug);
router.get("/collections/products/:slug", getProductsByCollection);
router.get("/products/:slug/related", getRelatedProducts);
router.get("/products", getProducts);
router.get("/search", getProductBySearchTerm);
router.get(
  "/admin/products/:productId",
  authMiddleware,
  authorizationMiddleware,
  getProductById
);
router.post("/product", uploadMiddleware, addProduct);
router.delete("/product", deleteProduct);
export default router;
