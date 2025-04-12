import ICart from "@/interfaces/cart.interface";
import {
  createOrderDraft,
  getCheckoutOrderByOrderId,
} from "@/api/orderService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ToastifyError } from "@/helpers/showToastify";
const useCheckoutOrder = (orderId: string = "") => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["orders", orderId],
    queryFn: () => getCheckoutOrderByOrderId(orderId),
    enabled: !!orderId,
  });
  const {
    mutate: submitOrderDraftMutation,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: ({
      note,
      products,
      total_price,
      total_items,
    }: {
      note: string;
      products: ICart;
      total_price: number;
      total_items: number;
    }) => createOrderDraft({ note, products, total_price, total_items }),
    onSuccess: (data) => navigate(`/checkouts/${data.orderId}`),
    onError: (error) => ToastifyError(error.message),
  });
  return {
    data,
    isLoading,
    error,
    submitOrderDraft: submitOrderDraftMutation,
    isPending,
    isSuccess,
  };
};
export default useCheckoutOrder;
