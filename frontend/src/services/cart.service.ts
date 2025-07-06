import IUpdateCartRequest from "@/interfaces/cart/update-cart-request.interface";
import httpRequest from "../config/axios.config";
import ICartItems from "@/interfaces/cart/cart-items.interface";

export const getCart = async () => {
  try {
    const { data } = await httpRequest.get("/cart");
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

const addCart = async (cart: ICartItems) => {
  try {
    const { data } = await httpRequest.post("/cart", cart);
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

const updateQuantity = async (request: IUpdateCartRequest) => {
  try {
    const { data } = await httpRequest.patch("/cart", request);
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};
const removeFromCart = async (request: IUpdateCartRequest) => {
  try {
    const { data } = await httpRequest.post(`/cart/remove`, request);
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};
export { addCart, removeFromCart, updateQuantity };
