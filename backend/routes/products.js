import express from "express";
import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
} from "../controllers/productsController.js";
import authenTokenMiddleware from "../middleware/authTokenMiddleware.js";
import upload from "../middleware/multerMiddleware.js";
const router = express.Router();

router.get("/products", authenTokenMiddleware, getProducts);
router.get("/product/:id", getProductById);
router.post("/product", upload.array("files", 10), addProduct);
router.delete("/product", deleteProduct);
export default router;
