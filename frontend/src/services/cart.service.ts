import IUpdateCartRequest from "@/interfaces/cart/update-cart-request.interface";
import httpRequest from "../config/axios.config";
import ICartItems from "@/interfaces/cart/cart-items.interface";

export const getCart = async () => {
  const { data } = await httpRequest.get("/cart");
  return data;
};

const addCart = async (cart: ICartItems) => {
  const { data } = await httpRequest.post("/cart", cart);
  return data;
};

const updateQuantity = async (request: IUpdateCartRequest) => {
  const { data } = await httpRequest.patch("/cart", request);
  return data;
};
const removeFromCart = async (request: IUpdateCartRequest) => {
  const { data } = await httpRequest.post(`/cart/remove`, request);
  return data;
};
export { addCart, removeFromCart, updateQuantity };
