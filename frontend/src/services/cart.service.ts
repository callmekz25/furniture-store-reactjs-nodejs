import IUpdateCartRequest from "@/interfaces/cart/update-cart-request.interface";
import httpRequest from "./config";
import ICartItems from "@/interfaces/cart/cart-items.interface";
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
    const { attributes } = request;
    const { data } = await httpRequest.patch("/cart", {
      ...request,
      attributes: JSON.stringify(attributes),
    });
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};
const removeFromCart = async (request: IUpdateCartRequest) => {
  try {
    const { attributes, productId } = request;

    const { data } = await httpRequest.delete(`/cart`, {
      params: {
        productId: productId,
        attributes: JSON.stringify(attributes),
      },
    });
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};
export { addCart, removeFromCart, updateQuantity };
