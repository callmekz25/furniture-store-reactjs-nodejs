import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCart,
  addCart,
  removeFromCart,
  updateQuantity,
} from "@/api/cartService";
const useCart = () => {
  const queryClient = useQueryClient();
  const {
    data: cartData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });
  const addToCartMutation = useMutation({
    mutationFn: addCart,
    onSuccess: (data) => {
      queryClient.setQueryData(["cart"], data); // Gọi lại API để cập nhật giỏ hàng
    },
  });
  const updateQuantityMutation = useMutation({
    mutationFn: ({
      productId,
      attributes,
      quantity,
    }: {
      productId: string;
      attributes: string[];
      quantity: number;
    }) => updateQuantity(productId, attributes, quantity),
    onSuccess: (data) => {
      queryClient.setQueryData(["cart"], data); // Gọi lại API để cập nhật giỏ hàng
    },
  });
  const removeFromCartMutation = useMutation({
    mutationFn: ({
      productId,
      attributes,
    }: {
      productId: string;
      attributes: string[];
    }) => removeFromCart(productId, attributes),
    onSuccess: (data) => {
      queryClient.setQueryData(["cart"], data); // Gọi lại API để cập nhật giỏ hàng
    },
  });
  // Dùng mutateAsync để có thể await dữ liệu
  return {
    cartData,
    isLoading,
    error,
    addToCart: addToCartMutation.mutateAsync,
    removeFromCart: removeFromCartMutation.mutateAsync,
    updateQuantityToCart: updateQuantityMutation.mutateAsync,
  };
};

export default useCart;
