import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCart, addCart, removeFromCart } from "@/api/cartService";
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
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]); // Gọi lại API để cập nhật giỏ hàng
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
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]); // Gọi lại API để cập nhật giỏ hàng
    },
  });
  // Dùng mutateAsync để có thể await dữ liệu
  return {
    cartData,
    isLoading,
    error,
    addToCart: addToCartMutation.mutateAsync,
    removeFromCart: removeFromCartMutation.mutateAsync,
  };
};

export default useCart;
