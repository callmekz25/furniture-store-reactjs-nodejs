import PaymentMethod from "@/enums/payment-method";

export const getPaymentMethodVi = (paymentMethod: PaymentMethod) => {
  let method = "";
  switch (paymentMethod) {
    case PaymentMethod.MOMO:
      method = "Thanh toán qua MOMO";
      break;
    case PaymentMethod.COD:
      method = "Thanh toán khi nhận hàng";
      break;

    default:
      break;
  }
  return method;
};
