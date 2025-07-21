import IPlaceTempOrderRequest from "@/interfaces/order/place-order-temp-request";
import IOrder from "@/interfaces/order/order.interface";
import {
  placeTempOrder,
  getOrderById,
  getOrdersByUserId,
} from "@/services/order.service";
import { useMutation, useQuery } from "@tanstack/react-query";
export const useGetOrderById = (id: string, type: string) => {
  return useQuery<IOrder>({
    queryKey: ["orders", id],
    queryFn: () => getOrderById(id, type),
    enabled: !!id && !!type,
  });
};

export const useGetOrderByUserId = () => {
  return useQuery<IOrder[]>({
    queryKey: ["orders-user"],
    queryFn: getOrdersByUserId,
  });
};

export const useCreateOrderTemp = () => {
  return useMutation({
    mutationFn: (request: IPlaceTempOrderRequest) => placeTempOrder(request),
  });
};
