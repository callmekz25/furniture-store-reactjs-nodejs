import httpRequest from "../config/axios.config";
import IPlaceTempOrderRequest from "@/interfaces/order/place-order-temp-request";

export const getOrderById = async (id: string, type: string) => {
  let res;
  if (type === "checkout") {
    const { data } = await httpRequest.get(`/orders/${id}`, {
      params: {
        type,
      },
    });
    res = data;
  } else if (type === "detail") {
    const { data } = await httpRequest.get(`/account/orders/${id}`, {
      params: {
        type,
      },
    });
    res = data;
  }
  return res;
};

export const getOrdersByUserId = async () => {
  const { data } = await httpRequest.get("/account/orders");
  return data;
};

export const placeTempOrder = async (request: IPlaceTempOrderRequest) => {
  const { data } = await httpRequest.post("/orders", request);
  return data;
};

export const confirmedOrder = async (orderInfo, orderId) => {
  const { data } = await httpRequest.post(
    `/orders/${orderId}/confirm`,
    orderInfo
  );
  return data;
};
