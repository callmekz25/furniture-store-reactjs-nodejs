import httpRequest from "../config/axios.config";
import IPlaceTempOrderRequest from "@/interfaces/order/place-order-temp-request";

export const getOrderById = async (id: string) => {
  const { data } = await httpRequest.get(`/checkouts/${id}`);
  return data;
};
export const getOrderStatus = async (id: string) => {
  const { data } = await httpRequest.get(`/orders/${id}/status`);
  return data;
};
export const placeTempOrder = async (request: IPlaceTempOrderRequest) => {
  const { data } = await httpRequest.post("/checkouts", request);
  return data;
};

export const confirmedOrder = async (orderInfo, orderId) => {
  const { data } = await httpRequest.post(`/payment/${orderId}`, orderInfo);
  return data;
};
