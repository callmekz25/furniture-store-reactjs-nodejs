import ICheckoutRequest from "@/interfaces/checkout/checkout-request";
import httpRequest from "./config";

export const createPayment = async (payload: ICheckoutRequest) => {
  try {
    const { data } = await httpRequest.post("/payment", payload);
    return data;
  } catch (error) {
    throw new Error("Lỗi xảy khi thanh toán!");
  }
};
