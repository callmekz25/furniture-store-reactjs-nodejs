import httpRequest from "./config";
import ICart from "@/interfaces/cart.interface";
const addCart = async (cart: ICart) => {
  try {
    const { data } = await httpRequest.post("/cart", cart);
    return data;
  } catch (error: any) {
    throw Error(error?.response?.data?.mess);
  }
};

const getCart = async () => {
  try {
    const { data } = await httpRequest.get("/cart");
    return data;
  } catch (error: any) {
    throw Error(error?.response?.data?.mess);
  }
};
const removeFromCart = async (productId: string) => {
  try {
    const { data } = await httpRequest.delete(`/cart/${productId}`);
    return data;
  } catch (error: any) {
    throw Error(error?.response?.data?.mess);
  }
};
export { addCart, getCart, removeFromCart };
