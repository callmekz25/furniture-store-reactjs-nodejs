import httpRequest from "./config";
import ICart from "@/interfaces/cart.interface";
const addCart = async (cart: ICart) => {
  try {
    const { data } = await httpRequest.post("/cart", cart);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getCart = async () => {
  try {
    const { data } = await httpRequest.get("/cart");
    return data;
  } catch (error) {
    console.log(error);
  }
};
const removeFromCart = async (productId: string) => {
  try {
    const { data } = await httpRequest.delete(`/cart/${productId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export { addCart, getCart, removeFromCart };
