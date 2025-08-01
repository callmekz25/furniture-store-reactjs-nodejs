import httpRequest from "@/config/axios.config";

export const getUsers = async () => {
  const { data } = await httpRequest.get("/users");
  return data;
};
