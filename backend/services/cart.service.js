import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import { getCartById } from "../repos/cart.repo.js";
import attributesEqual from "../utils/attributes-equal.js";
import { NotFoundError } from "../core/error.response.js";
import attachPromotions from "../helpers/attachPromotions.js";
class CartService {
  static addToCart = async ({ product, userId, cartId }) => {
    const { productId, quantity, attributes } = product;
    if (!product || (!userId && !cartId)) {
      throw new NotFoundError("Đã xảy ra lỗi");
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
          item.productId.toString() === productId.toString() &&
          attributesEqual(item.attributes, attributes)
      );
    } else {
      itemExisting = userCart.items.findIndex(
        (item) => item.productId.toString() === productId.toString()
      );
    }
    if (itemExisting > -1) {
      userCart.items[itemExisting].quantity += quantity;
    } else {
      userCart.items.push(product);
    }

    await userCart.save();
    return userCart;
  };
  static getUserCart = async ({ cartId, userId }) => {
    // Use lean to return plain object to assign sub item in object
    const userCart = await getCartById(userId, cartId, true);

    if (userCart) {
      if (userCart.items.length > 0) {
        userCart.items = await attachPromotions(userCart.items);
        userCart.totalItems = userCart.items.reduce((acc, current) => {
          acc += current.quantity;
          return acc;
        }, 0);
        userCart.totalPrice = userCart.items.reduce((acc, current) => {
          const discount = current.promotion?.discountValue ?? 0;
          acc += current.price * (1 - discount / 100) * current.quantity;
          return acc;
        }, 0);
      }
    }

    return userCart;
  };
  static updateQuantity = async ({
    quantity,
    productId,
    attributes,
    userId,
    cartId,
  }) => {
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
      throw new NotFoundError("Đã xảy ra lỗi");
    }
    let updateItems;

    if (attributes !== null) {
      updateItems = userCart.items.find(
        (item) =>
          item.productId.toString() === productId.toString() &&
          attributesEqual(item.attributes, attributes)
      );
    } else {
      updateItems = userCart.items.find(
        (item) => item.productId.toString() === productId.toString()
      );
    }
    if (!updateItems) {
      throw new NotFoundError("Đã xảy ra lỗi");
    }
    updateItems.quantity = quantity;

    await userCart.save();
    return userCart;
  };
  static removeItem = async ({ productId, attributes, userId, cartId }) => {
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      throw new NotFoundError("Đã xảy ra lỗi");
    }
    const userCart = await getCartById(userId, cartId);

    if (userCart) {
      let updateItems;

      if (attributes !== null) {
        updateItems = userCart.items.filter(
          (item) =>
            !(
              item.productId.toString() === productId.toString() &&
              attributesEqual(item.attributes, attributes)
            )
        );
      } else {
        updateItems = userCart.items.filter(
          (item) => !(item.productId.toString() === productId.toString())
        );
      }

      userCart.items = updateItems;
    }
    await userCart.save();
    return userCart;
  };
}
export default CartService;
