import ICartItems from "@/interfaces/cart/cart-items.interface";
import ICart from "@/interfaces/cart/cart.interface";
import IUpdateCartRequest from "@/interfaces/cart/update-cart-request.interface";
import {
  addCart,
  getCart,
  removeFromCart,
  updateQuantity,
} from "@/services/cart.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetCart = () => {
  return useQuery<ICart>({
    queryKey: ["cart"],
    queryFn: getCart,
  });
};

export const useAddToCart = () => {
  return useMutation({
    mutationFn: (data: ICartItems) => addCart(data),
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
