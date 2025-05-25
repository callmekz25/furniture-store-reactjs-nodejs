import ICart from "@/interfaces/cart.interface";
import IUpdateCartRequest from "@/interfaces/cart/update-cart-request.interface";
import {
  addCart,
  getCart,
  removeFromCart,
  updateQuantity,
} from "@/services/cartService";
import { useQuery, useMutation } from "@tanstack/react-query";
export const useGetCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });
};

export const useAddToCart = () => {
  return useMutation({
    mutationFn: (data: ICart) => addCart(data),
  });
};
export const useUpdateQuantityProductCart = () => {
  return useMutation({
    mutationFn: (request: IUpdateCartRequest) => updateQuantity(request),
  });
};

export const useDeleteProductCart = () => {
  return useMutation({
    mutationFn: (request: IUpdateCartRequest) => removeFromCart(request),
  });
};
