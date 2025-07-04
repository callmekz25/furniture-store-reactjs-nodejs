import httpRequest from "@/config/axios.config";

export const getUser = async () => {
  try {
    const { data } = await httpRequest.get("/get-user");
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};
