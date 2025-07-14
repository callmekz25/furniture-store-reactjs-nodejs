import Cart from "../models/cart.model.js";
const getCartById = async (userId, cartId, lean = false) => {
  let query = {};
  if (userId) query.userId = userId;
  else if (cartId) query._id = cartId;
  else return null;

  const cartQuery = Cart.findOne(query);
  return lean ? cartQuery.lean() : cartQuery;
};

export { getCartById };
