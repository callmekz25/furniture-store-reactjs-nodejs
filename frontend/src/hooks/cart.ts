import ICart from "@/interfaces/cart.interface";
import IUpdateCartRequest from "@/interfaces/cart/update-cart-request.interface";
import {
  addCart,
  getCart,
  removeFromCart,
  updateQuantity,
} from "@/services/cartService";
import { useMutation } from "@tanstack/react-query";

export const useAddToCart = () => {
  return useMutation({
    mutationFn: (data: ICart) => addCart(data),
  });
};
export const useUpdateQuantity = () => {
  return useMutation({
    mutationFn: (request: IUpdateCartRequest) => updateQuantity(request),
  });
};

export const useDeleteProductCart = () => {
  return useMutation({
    mutationFn: (request: IUpdateCartRequest) => removeFromCart(request),
  });
};
