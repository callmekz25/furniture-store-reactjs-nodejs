import IPlaceTempOrderRequest from "@/interfaces/order/place-order-temp-request";
import IOrder from "@/interfaces/order/order.interface";
import {
  placeTempOrder,
  getOrderById,
  getOrdersByUserId,
  confirmedOrder,
  getOrders,
} from "@/services/order.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import IPaymentRequest from "@/interfaces/checkout/payment-request";

export const useGetOrders = () => {
  return useQuery<IOrder[]>({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
};

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

export const useConfirmOrder = () => {
  return useMutation({
    mutationFn: ({
      payload,
      orderId,
    }: {
      payload: IPaymentRequest;
      orderId: string;
    }) => confirmedOrder(payload, orderId),
  });
};
