import ICheckoutRequest from "@/interfaces/checkout/checkout-request";
import { createPayment } from "@/services/paymentService";
import { useMutation } from "@tanstack/react-query";

export const usePayment = () => {
  return useMutation({
    mutationFn: (request: ICheckoutRequest) => createPayment(request),
  });
};
