import IOrderTempRequest from "@/interfaces/checkout/order-temp-request";
import {
  createOrderDraft,
  getCheckoutOrderByOrderId,
} from "@/services/orderService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetCheckout = (orderId: string) => {
  return useQuery({
    queryKey: ["orders", orderId],
    queryFn: () => getCheckoutOrderByOrderId(orderId),
    enabled: !!orderId,
  });
};

export const useCreateOrderTemp = () => {
  return useMutation({
    mutationFn: (request: IOrderTempRequest) => createOrderDraft(request),
  });
};
