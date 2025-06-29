import httpRequest from "./config";
import IOrderTempRequest from "@/interfaces/order/order-temp-request";

export const createOrderDraft = async (request: IOrderTempRequest) => {
  try {
    const { data } = await httpRequest.post("/checkouts", request);
    return data;
  } catch (error) {
    throw new Error("Lỗi xảy ra vui lòng thử lại!");
  }
};

export const confirmedOrder = async (orderInfo, orderId) => {
  try {
    const { data } = await httpRequest.post(`/checkouts/${orderId}`, orderInfo);
    return data;
  } catch (error) {
    throw new Error("Lỗi xảy ra vui lòng thử lại!");
  }
};
