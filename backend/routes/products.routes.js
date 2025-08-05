import express from "express";
import ProductController from "../controllers/product.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorizationMiddleware from "../middlewares/authorization.middleware.js";
import multerMiddleware from "../middlewares/multer.middleware.js";
import {
  validateAddProduct,
  validateSearchProduct,
} from "../middlewares/validate-product.middleware.js";
import { handleValidateErrors } from "../middlewares/handle-validate-error.middlware.js";
const router = express.Router();

router.get(
  "/collections/:slug",
  ProductController.getProductListByCollectionName
);

router.get("/products/:slug", ProductController.getProductBySlug);
router.get(
  "/collections/:slug/products",
  ProductController.getProductsByCollection
);
router.get("/products/:id/related", ProductController.getRelatedProducts);
router.post("/products/embedding", ProductController.generateEmbedding);
router.get("/products", ProductController.getProducts);
router.get(
  "/search",
  validateSearchProduct,
  handleValidateErrors,
  ProductController.getProductBySearchTerm
);
router.get(
  "/admin/products/:id",
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
  multerMiddleware,
  authMiddleware,
  authorizationMiddleware,
  validateAddProduct,
  handleValidateErrors,
  ProductController.addProduct
);
router.delete(
  "/products/:id",
  authMiddleware,
  authorizationMiddleware,
  ProductController.deleteProduct
);
export default router;
