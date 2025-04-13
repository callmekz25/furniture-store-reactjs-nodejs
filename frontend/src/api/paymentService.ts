import httpRequest from "./config";

export const createMomoPayment = async (payload) => {
  try {
    const { data } = await httpRequest.post("/payment/momo", payload);
    return data;
  } catch (error) {
    throw new Error("Lỗi xảy khi thanh toán!");
  }
};
