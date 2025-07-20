import httpRequest from "@/config/axios.config";
import { IAddress } from "@/interfaces/address/address.interface";

export const getUser = async () => {
  const { data } = await httpRequest.get("/get-user");
  return data;
};
export const addAddress = async (payload: IAddress) => {
  const { data } = await httpRequest.post("/account/address", payload);
  return data;
};

export const updateAddress = async (payload: IAddress) => {
  const { data } = await httpRequest.patch("/account/address", payload);
  return data;
};
