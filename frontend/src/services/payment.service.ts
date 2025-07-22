import httpRequest from "../config/axios.config";

export const createPayment = async (
  orderId: string,
  paymentMethod: "momo" | "cod"
) => {
  const { data } = await httpRequest.post(
    `/payments/${orderId}?paymentMethod=${paymentMethod}`
  );
  return data;
};
