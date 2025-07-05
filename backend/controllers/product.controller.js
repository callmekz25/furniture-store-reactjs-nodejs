import { OkSuccess } from "../core/success.response.js";
import ProductService from "../services/product.service.js";
import asyncHandler from "../helpers/asyncHandler.js";
class ProductController {
  static getAllProducts = asyncHandler(async (req, res, next) => {
    const products = await ProductService.getAllProducts();
    return res.status(200).json(
      new OkSuccess({
        data: products,
      })
    );
  });
  static getProductsByCollection = asyncHandler(async (req, res, next) => {
    const { slug } = req.params;
    const { limit } = req.query;
    const result = await ProductService.getProductsByCollection(slug, limit);
    return res.status(200).json(
      new OkSuccess({
        data: result,
      })
    );
  });
  static getRelatedProducts = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const products = await ProductService.getRelatedProducts(id);
    return res.status(200).json(
      new OkSuccess({
        data: products,
      })
    );
  });
  static getProductBySlug = asyncHandler(async (req, res, next) => {
    const { slug } = req.params;
    const product = await ProductService.getProductBySlug(slug);

    return res.status(200).json(
      new OkSuccess({
        data: product,
      })
    );
  });

  static getProductBySearchTerm = asyncHandler(async (req, res, next) => {
    const result = await ProductService.getProductsBySearchTerm(req.query);

    return res.status(200).json(new OkSuccess({ data: result }));
  });
  static getProductById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = await ProductService.getProductById(id);

    return res.status(200).json(
      new OkSuccess({
        data: product,
      })
    );
  });

  static getProductListBySlug = asyncHandler(async (req, res, next) => {
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
    return res.status(200).json(
      new OkSuccess({
        data: result,
      })
    );
  });

  static addProduct = asyncHandler(async (req, res, next) => {
    const product = await ProductService.addProduct(req.body);
    return res.status(200).json(
      new OkSuccess({
        data: product,
        message: "Add product successfully",
      })
    );
  });
  static updateProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { collections } = req.body;
    const product = await ProductService.updateProduct(id, collections);
    return res.status(200).json(
      new OkSuccess({
        message: "Update successfully",
        data: product,
      })
    );
  });
  static deleteProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    await ProductService.deleteProduct(id);
    return res.status(200).json(
      new OkSuccess({
        message: "Delete successfully",
      })
    );
  });
  static generateEmbedding = asyncHandler(async (req, res, next) => {
    await ProductService.generateEmbedding();
    return res.status(200).json(
      new OkSuccess({
        message: "Generate embeddings successful",
      })
    );
  });
}

export default ProductController;
