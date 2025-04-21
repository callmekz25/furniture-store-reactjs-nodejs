import Cart from "../models/cart.model.js";
const getCartById = async (userId, cartId) => {
  let query = {};
  if (userId) {
    query = {
      userId: userId,
    };
  } else if (cartId) {
    query = {
      _id: cartId,
    };
  } else {
    query = null;
  }
  const cart = await Cart.findOne(query);

  return cart;
};

export { getCartById };
