import httpRequest from "./config";
import IOrderTempRequest from "@/interfaces/checkout/order-temp-request";

export const createOrderDraft = async (request: IOrderTempRequest) => {
  try {
    const { data } = await httpRequest.post("/checkouts", request);
    return data;
  } catch (error) {
    throw new Error("Lỗi xảy ra vui lòng thử lại!");
  }
};
export const getCheckoutOrderByOrderId = async (orderId: string) => {
  try {
    const { data } = await httpRequest.get(`/checkouts/${orderId}`);
    return data;
  } catch (error) {
    throw new Error("Lỗi xảy ra vui lòng thử lại!");
  }
};
export const confirmOrder = async (orderInfo, orderId) => {
  try {
    const { data } = await httpRequest.post(`/checkouts/${orderId}`, orderInfo);
    return data;
  } catch (error) {
    throw new Error("Lỗi xảy ra vui lòng thử lại!");
  }
};
