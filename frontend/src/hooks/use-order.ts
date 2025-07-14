import IOrderTempRequest from "@/interfaces/order/order-temp-request";
import IOrder from "@/interfaces/order/order.interface";
import { placeTempOrder, getOrderById } from "@/services/order.service";
import { useMutation, useQuery } from "@tanstack/react-query";
export const useGetOrderById = (id: string) => {
  return useQuery<IOrder>({
    queryKey: ["orders", id],
    queryFn: () => getOrderById(id),
    enabled: !!id,
  });
};
export const useCreateOrderTemp = () => {
  return useMutation({
    mutationFn: (request: IOrderTempRequest) => placeTempOrder(request),
  });
};
