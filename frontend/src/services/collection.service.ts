import httpRequest from "@/config/axios.config";

export const getCollections = async () => {
  try {
    const { data } = await httpRequest.get(`/get-collections`);
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};
