import { createPayment } from "@/services/payment.service";
import { useMutation } from "@tanstack/react-query";

export const usePayment = () => {
  return useMutation({
    mutationFn: ({
      orderId,
      paymentMethod,
    }: {
      orderId: string;
      paymentMethod: "cod" | "momo";
    }) => createPayment(orderId, paymentMethod),
  });
};
