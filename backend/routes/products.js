import express from "express";
import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
} from "../controllers/productsController.js";
const router = express.Router();

router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.post("/products", addProduct);
router.delete("/products", deleteProduct);
export default router;
