import CartService from "../services/cart.service.js";
class CartController {
  static addToCart = async (req, res) => {
    try {
      const product = req.body;

      const cartId = req.cartId;
      const userId = req.user?.userId;

      const userCart = await CartService.addToCart({ product, userId, cartId });
      return res.status(200).json(userCart);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };
  static getUserCart = async (req, res) => {
    try {
      const cartId = req.cartId;
      const userId = req.user?.userId;

      const userCart = await CartService.getUserCart({ cartId, userId });

      return res.status(200).json(userCart);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };

  static removeItem = async (req, res) => {
    try {
      const { productId, attributes } = req.query;
      const userId = req.user?.userId;
      const cartId = req.cartId;

      const userCart = await CartService.removeItem({
        productId,
        attributes,
        userId,
        cartId,
      });
      return res.status(200).json(userCart);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };

  static updateQuantity = async (req, res) => {
    try {
      const { quantity, productId, attributes } = req.body;
      const userId = req.user?.userId;
      const cartId = req.cartId;
      const userCart = await CartService.updateQuantity({
        quantity,
        productId,
        attributes,
        userId,
        cartId,
      });
      return res.status(200).json(userCart);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };
}

export default CartController;
