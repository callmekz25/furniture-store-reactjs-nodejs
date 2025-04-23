import CartService from "../services/cart.service.js";
import asyncHandler from "../helpers/asyncHandler.js";
import { OkSuccess } from "../core/success.response.js";
class CartController {
  static addToCart = asyncHandler(async (req, res, next) => {
    const product = req.body;

    const cartId = req.cartId;
    const userId = req.user?._id;

    const userCart = await CartService.addToCart({ product, userId, cartId });
    return res.status(200).json(new OkSuccess({ data: userCart }));
  });
  static getUserCart = asyncHandler(async (req, res, next) => {
    const cartId = req.cartId;
    const userId = req.user?._id;

    const userCart = await CartService.getUserCart({ cartId, userId });

    return res.status(200).json(new OkSuccess({ data: userCart }));
  });

  static removeItem = asyncHandler(async (req, res, next) => {
    const { productId, attributes } = req.query;
    const userId = req.user?._id;
    const cartId = req.cartId;

    const userCart = await CartService.removeItem({
      productId,
      attributes,
      userId,
      cartId,
    });
    return res.status(200).json(new OkSuccess({ data: userCart }));
  });

  static updateQuantity = asyncHandler(async (req, res, next) => {
    const { quantity, productId, attributes } = req.body;

    const userId = req.user?._id;
    const cartId = req.cartId;
    const userCart = await CartService.updateQuantity({
      quantity,
      productId,
      attributes,
      userId,
      cartId,
    });
    return res.status(200).json(new OkSuccess({ data: userCart }));
  });
}

export default CartController;
