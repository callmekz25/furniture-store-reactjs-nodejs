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
    const products = await ProductService.getProductsByCollection(slug, limit);
    return res.status(200).json(
      new OkSuccess({
        data: products,
      })
    );
  });
  static getRelatedProducts = asyncHandler(async (req, res, next) => {
    const { limit } = req.query;
    const { slug } = req.params;

    const products = await ProductService.getRelatedProducts(slug, limit);
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
    const { productId } = req.params;
    const product = await ProductService.getProductById(productId);

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
  static deleteProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.body;
    await ProductService.deleteProduct(id);
    return res.status(200).json(
      new OkSuccess({
        message: "Delete product successfully",
      })
    );
  });
}

export default ProductController;
