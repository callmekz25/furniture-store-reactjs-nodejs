import httpRequest from "@/config/axios.config";

export const getHeroImages = async () => {
  try {
    const { data } = await httpRequest.get(`/banners/hero`);
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};
