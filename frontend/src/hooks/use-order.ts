import IPlaceTempOrderRequest from "@/interfaces/order/place-order-temp-request";
import IOrder from "@/interfaces/order/order.interface";
import {
  placeTempOrder,
  getOrderById,
  getOrderStatus,
} from "@/services/order.service";
import { useMutation, useQuery } from "@tanstack/react-query";
export const useGetOrderById = (id: string) => {
  return useQuery<IOrder>({
    queryKey: ["orders", id],
    queryFn: () => getOrderById(id),
    enabled: !!id,
  });
};
export const useGetOrderStatus = (id: string) => {
  return useQuery<IOrder>({
    queryKey: ["orders", id],
    queryFn: () => getOrderStatus(id),
    enabled: !!id,
  });
};
export const useCreateOrderTemp = () => {
  return useMutation({
    mutationFn: (request: IPlaceTempOrderRequest) => placeTempOrder(request),
  });
};
