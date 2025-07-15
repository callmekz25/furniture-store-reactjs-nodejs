import ICheckoutRequest from "@/interfaces/checkout/payment-request";
import httpRequest from "../config/axios.config";

export const createPayment = async (payload: ICheckoutRequest) => {
  const { data } = await httpRequest.post(
    `/payment/${payload.orderId}`,
    payload
  );
  return data;
};
