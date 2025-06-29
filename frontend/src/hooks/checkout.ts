import IOrderTempRequest from "@/interfaces/order/order-temp-request";
import { createOrderDraft } from "@/services/order.service";
import { useMutation } from "@tanstack/react-query";

export const useCreateOrderTemp = () => {
  return useMutation({
    mutationFn: (request: IOrderTempRequest) => createOrderDraft(request),
  });
};
