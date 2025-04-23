import httpRequest from "./config";

const getBannersByTypes = async (type: string) => {
  try {
    const { data } = await httpRequest.get(`/banners/${type}`);

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};
export { getBannersByTypes };
