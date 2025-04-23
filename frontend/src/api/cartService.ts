import httpRequest from "./config";
import ICart from "@/interfaces/cart.interface";
const addCart = async (cart: ICart) => {
  try {
    const { data } = await httpRequest.post("/cart", cart);
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

const getCart = async () => {
  try {
    const { data } = await httpRequest.get("/cart");
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};
const updateQuantity = async (
  productId: string,
  attributes: string[],
  quantity: number
) => {
  try {
    const stringifyAttributes = JSON.stringify(attributes);
    const { data } = await httpRequest.patch("/cart/change", {
      productId: productId,
      quantity: quantity,
      attributes: stringifyAttributes,
    });
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};
const removeFromCart = async (productId: string, atrributes: string[]) => {
  try {
    const stringifyAttributes = JSON.stringify(atrributes);
    const { data } = await httpRequest.delete(
      `/cart?productId=${productId}&attributes=${stringifyAttributes}`
    );
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};
export { addCart, getCart, removeFromCart, updateQuantity };
