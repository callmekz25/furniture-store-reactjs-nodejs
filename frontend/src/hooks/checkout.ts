import IOrderTempRequest from "@/interfaces/checkout/order-temp-request";
import { createOrderDraft } from "@/services/orderService";
import { useMutation } from "@tanstack/react-query";

export const useCreateOrderTemp = () => {
  return useMutation({
    mutationFn: (request: IOrderTempRequest) => createOrderDraft(request),
  });
};
