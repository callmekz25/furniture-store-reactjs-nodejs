import express from "express";
import ProductController from "../controllers/product.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import authorizationMiddleware from "../middleware/authorization.middleware.js";
import multerMiddleware from "../middleware/multer.middleware.js";
const router = express.Router();

router.get("/collections/:slug", ProductController.getProductListBySlug);

router.get("/products/:slug", ProductController.getProductBySlug);
router.get(
  "/collections/:slug/products",
  ProductController.getProductsByCollection
);
router.get("/products/:slug/related", ProductController.getRelatedProducts);
router.get("/products", ProductController.getAllProducts);
router.get("/search", ProductController.getProductBySearchTerm);
router.get(
  "/admin/products/:productId",
  authMiddleware,
  authorizationMiddleware,
  ProductController.getProductById
);
router.put(
  "/products/:id",
  authMiddleware,
  authorizationMiddleware,
  multerMiddleware,
  ProductController.updateProduct
);
router.post(
  "/products",
  authMiddleware,
  authorizationMiddleware,
  multerMiddleware,
  ProductController.addProduct
);
router.delete(
  "/products/:id",
  authMiddleware,
  authorizationMiddleware,
  ProductController.deleteProduct
);
export default router;
