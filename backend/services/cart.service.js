import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import { getCartById } from "../repos/cart.repo.js";
import arraysEqual from "../utils/arraysEqual.js";
import { NotFoundError } from "../core/error.response.js";
class CartService {
  static addToCart = async ({ product, userId, cartId }) => {
    const { productId, quantity, attributes } = product;
    if (!product || (!userId && !cartId)) {
      throw new Error("Missing required field");
    }
    const userCart = await getCartById(userId, cartId);
    if (!userCart) {
      const cartData = { userId: userId ?? null, items: [] };
      if (cartId) cartData._id = cartId;
      userCart = await Cart.create(cartData);
    }
    const itemExisting = userCart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        arraysEqual(item.attributes, attributes)
    );
    if (itemExisting > -1) {
      userCart.items[itemExisting].quantity += quantity;
    } else {
      userCart.items.push(product);
    }
    userCart.total_items = userCart.items.length;
    userCart.total_price = Math.ceil(
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
    if (!productId || !quantity) {
      throw new Error("Invalid data");
    }
    const userCart = await getCartById(userId, cartId);

    if (!userCart) {
      throw new NotFoundError("Not found cart");
    }
    let updateItems;
    const parsedAttributes = attributes ? JSON.parse(attributes) : [];

    if (parsedAttributes.length > 0) {
      updateItems = userCart.items.find(
        (item) =>
          item.productId === productId &&
          arraysEqual(item.attributes, parsedAttributes)
      );
    } else {
      updateItems = userCart.items.find((item) => item.productId === productId);
    }
    if (!updateItems) {
      throw new NotFoundError("Not found product");
    }
    updateItems.quantity = quantity;
    userCart.total_items = userCart.items.length;
    userCart.total_price = Math.ceil(
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
      throw new Error("Not found product");
    }
    const userCart = await getCartById(userId, cartId);
    const parsedAttributes = attributes ? JSON.parse(attributes) : [];

    if (userCart) {
      let updateItems;
      if (parsedAttributes.length > 0) {
        updateItems = userCart.items.filter(
          (item) =>
            !(
              item.productId === productId &&
              arraysEqual(item.attributes, parsedAttributes)
            )
        );
      } else {
        updateItems = userCart.items.filter(
          (item) => !(item.productId === productId)
        );
      }

      userCart.items = updateItems;
      userCart.total_items = userCart.items.length;
      userCart.total_price = Math.ceil(
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
