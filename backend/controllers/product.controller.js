import { OkSuccess } from "../core/success.response.js";
import ProductService from "../services/product.service.js";
class ProductController {
  static getAllProducts = async (req, res) => {
    try {
      const products = await ProductService.getAllProducts();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  static getProductsByCollection = async (req, res) => {
    try {
      const { slug } = req.params;
      const { limit } = req.query;
      const products = await ProductService.getProductsByCollection(
        slug,
        limit
      );
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ message: err.message });
    }
  };
  static getRelatedProducts = async (req, res) => {
    try {
      const { limit } = req.query;
      const { slug } = req.params;

      const products = await ProductService.getRelatedProducts(slug, limit);
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  static getProductBySlug = async (req, res) => {
    try {
      const { slug } = req.params;
      const product = await ProductService.getProductBySlug(slug);

      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  static getProductBySearchTerm = async (req, res) => {
    try {
      const { q } = req.query;
      const result = await ProductService.getProductsBySearchTerm(q);

      return res.status(200).json(new OkSuccess({ data: result }));
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  static getProductById = async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await ProductService.getProductById(productId);

      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  static getProductListBySlug = async (req, res) => {
    try {
      const { slug } = req.params;
      const {
        price: priceQuery,
        page,
        sort: sortQuery,
        supplier: supplierQuery,
      } = req.query;
      const result = await ProductService.getProductListBySlug({
        slug,
        priceQuery,
        page,
        sortQuery,
        supplierQuery,
      });
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  static addProduct = async (req, res) => {
    try {
      const product = await ProductService.addProduct(req.body);
      return res
        .status(200)
        .json({ product, message: "Add product successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  static deleteProduct = async (req, res) => {
    try {
      const { id } = req.body;
      await ProductService.deleteProduct(id);
      res.status(200).json({ message: "Delete successfully!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
}

export default ProductController;
