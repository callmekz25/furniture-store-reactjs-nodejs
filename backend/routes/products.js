import express from "express";
import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
} from "../controllers/productsController.js";
import authenTokenMiddleware from "../middleware/authTokenMiddleware.js";
const router = express.Router();

router.get("/products", authenTokenMiddleware, getProducts);
router.get("/products/:id", getProductById);
router.post("/products", addProduct);
router.delete("/products", deleteProduct);
export default router;
