import { OkSuccess } from "../core/success.response.js";
import ProductService from "../services/product.service.js";
class ProductController {
  static getAllProducts = async (req, res, next) => {
    try {
      const products = await ProductService.getAllProducts();
      return res.status(200).json(products);
    } catch (error) {
      return next(error);
    }
  };
  static getProductsByCollection = async (req, res, next) => {
    try {
      const { slug } = req.params;
      const { limit } = req.query;
      const products = await ProductService.getProductsByCollection(
        slug,
        limit
      );
      return res.status(200).json(products);
    } catch (error) {
      return next(error);
    }
  };
  static getRelatedProducts = async (req, res, next) => {
    try {
      const { limit } = req.query;
      const { slug } = req.params;

      const products = await ProductService.getRelatedProducts(slug, limit);
      return res.status(200).json(products);
    } catch (error) {
      return next(error);
    }
  };
  static getProductBySlug = async (req, res, next) => {
    try {
      const { slug } = req.params;
      const product = await ProductService.getProductBySlug(slug);

      return res.status(200).json(product);
    } catch (error) {
      return next(error);
    }
  };

  static getProductBySearchTerm = async (req, res, next) => {
    try {
      const { q } = req.query;
      const result = await ProductService.getProductsBySearchTerm(q);

      return res.status(200).json(new OkSuccess({ data: result }));
    } catch (error) {
      return next(error);
    }
  };
  static getProductById = async (req, res, next) => {
    try {
      const { productId } = req.params;
      const product = await ProductService.getProductById(productId);

      return res.status(200).json(product);
    } catch (error) {
      return next(error);
    }
  };

  static getProductListBySlug = async (req, res, next) => {
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
      return next(error);
    }
  };

  static addProduct = async (req, res, next) => {
    try {
      const product = await ProductService.addProduct(req.body);
      return res
        .status(200)
        .json({ product, message: "Add product successfully" });
    } catch (error) {
      return next(error);
    }
  };
  static deleteProduct = async (req, res, next) => {
    try {
      const { id } = req.body;
      await ProductService.deleteProduct(id);
      res.status(200).json({ message: "Delete successfully!" });
    } catch (error) {
      return next(error);
    }
  };
}

export default ProductController;
