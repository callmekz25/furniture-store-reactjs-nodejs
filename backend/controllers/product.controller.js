import { OkSuccess } from "../core/success.response.js";
import asyncHandler from "../helpers/asyncHandler.js";
import ProductService from "../services/product.service.js";
class ProductController {
  static getProducts = asyncHandler(async (req, res, next) => {
    const { s, f, limit } = req.query;
    const products = await ProductService.getProducts({
      select: s,
      filter: f,
      limit: limit,
    });
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

  static getProductListByCollectionName = asyncHandler(
    async (req, res, next) => {
      const { slug } = req.params;
      const {
        price: priceQuery,
        page,
        sort: sortQuery,
        supplier: supplierQuery,
      } = req.query;
      const result = await ProductService.getProductListByCollectionName({
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
    }
  );

  static addProduct = asyncHandler(async (req, res, next) => {
    const product = await ProductService.addProduct(req.body, req.files);
    return res.status(200).json(
      new OkSuccess({
        data: product,
        message: "Thêm mới thành công",
      })
    );
  });
  static updateProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { collections } = req.body;
    const product = await ProductService.updateProduct(id, collections);
    return res.status(200).json(
      new OkSuccess({
        message: "Cập nhật thành công",
        data: product,
      })
    );
  });
  static deleteProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    await ProductService.deleteProduct(id);
    return res.status(200).json(
      new OkSuccess({
        message: "Xoá thành công",
      })
    );
  });
  static generateEmbedding = asyncHandler(async (req, res, next) => {
    await ProductService.generateEmbedding();
    return res.status(200).json(
      new OkSuccess({
        message: "Tạo embedding thành công",
      })
    );
  });
}

export default ProductController;
