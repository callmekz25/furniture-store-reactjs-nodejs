import ICheckoutRequest from "@/interfaces/checkout/payment-request";
import httpRequest from "./config";

export const createPayment = async (payload: ICheckoutRequest) => {
  try {
    const { data } = await httpRequest.post("/payment", payload);
    return data;
  } catch (error) {
    throw new Error(error?.response?.message);
  }
};
