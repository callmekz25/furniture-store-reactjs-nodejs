import express from "express";
import {
  addProduct,
  deleteProduct,
  getProductBySlug,
  getProducts,
} from "../controllers/productsController.js";
import authenTokenMiddleware from "../middleware/authTokenMiddleware.js";
import upload from "../middleware/multerMiddleware.js";
const router = express.Router();

router.get("/products", getProducts);
router.get("/product/:slug", getProductBySlug);
router.post("/product", upload.array("files", 10), addProduct);
router.delete("/product", deleteProduct);
export default router;
