import ICheckoutRequest from "@/interfaces/checkout/checkout-request";
import { createPayment } from "@/services/payment.service";
import { useMutation } from "@tanstack/react-query";

export const usePayment = () => {
  return useMutation({
    mutationFn: (request: ICheckoutRequest) => createPayment(request),
  });
};
