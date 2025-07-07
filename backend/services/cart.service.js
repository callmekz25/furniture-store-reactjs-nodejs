import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import { getCartById } from "../repos/cart.repo.js";
import attributesEqual from "../utils/attributes-equal.js";
import { BadRequestError, NotFoundError } from "../core/error.response.js";
class CartService {
  static addToCart = async ({ product, userId, cartId }) => {
    const { productId, quantity, attributes } = product;
    if (!product || (!userId && !cartId)) {
      throw new NotFoundError("Missing require fields");
    }
    let userCart = await getCartById(userId, cartId);
    if (!userCart) {
      const cartData = { userId: userId ?? null, items: [] };
      if (cartId) cartData._id = cartId;
      userCart = await Cart.create(cartData);
    }
    let itemExisting;
    if (attributes !== null) {
      itemExisting = userCart.items.findIndex(
        (item) =>
          item.productId.toString() === productId &&
          attributesEqual(item.attributes, attributes)
      );
    } else {
      itemExisting = userCart.items.findIndex(
        (item) => item.productId.toString() === productId
      );
    }
    if (itemExisting > -1) {
      userCart.items[itemExisting].quantity += quantity;
    } else {
      userCart.items.push(product);
    }
    userCart.totalItems = userCart.items.length;
    userCart.totalPrice = Math.ceil(
      userCart.items.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      )
    );

    await userCart.save();
    return userCart;
  };
  static getUserCart = async ({ cartId, userId }) => {
    const userCart = await getCartById(userId, cartId);
    return userCart;
  };
  static updateQuantity = async ({
    quantity,
    productId,
    attributes,
    userId,
    cartId,
  }) => {
    if (!productId || quantity === null) {
      throw new BadRequestError("Missing require fields");
    }
    if (quantity <= 0) {
      return await CartService.removeItem({
        productId,
        attributes,
        userId,
        cartId,
      });
    }
    const userCart = await getCartById(userId, cartId);

    if (!userCart) {
      throw new NotFoundError("Not found cart");
    }
    let updateItems;

    if (attributes !== null) {
      updateItems = userCart.items.find(
        (item) =>
          item.productId === productId &&
          attributesEqual(item.attributes, attributes)
      );
    } else {
      updateItems = userCart.items.find((item) => item.productId === productId);
    }
    if (!updateItems) {
      throw new NotFoundError("Not found product");
    }
    updateItems.quantity = quantity;
    userCart.totalItems = userCart.items.length;
    userCart.totalPrice = Math.ceil(
      userCart.items.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      )
    );
    await userCart.save();
    return userCart;
  };
  static removeItem = async ({ productId, attributes, userId, cartId }) => {
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      throw new NotFoundError("Not found product");
    }
    const userCart = await getCartById(userId, cartId);

    if (userCart) {
      let updateItems;

      if (attributes !== null) {
        updateItems = userCart.items.filter(
          (item) =>
            !(
              item.productId === productId &&
              attributesEqual(item.attributes, attributes)
            )
        );
      } else {
        updateItems = userCart.items.filter(
          (item) => !(item.productId === productId)
        );
      }

      userCart.items = updateItems;
      userCart.totalItems = userCart.items.length;
      userCart.totalPrice = Math.ceil(
        userCart.items.reduce(
          (total, item) => total + item.quantity * item.price,
          0
        )
      );
    }
    await userCart.save();
    return userCart;
  };
}
export default CartService;
