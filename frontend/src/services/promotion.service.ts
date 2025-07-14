import httpRequest from "@/config/axios.config";
import IPromotion from "@/interfaces/promotion/promotion.interface";

export const addPromotion = async (payload: IPromotion) => {
  try {
    const { data } = await httpRequest.post("/promotions", payload);
    return data;
  } catch (error) {
    throw new Error(error?.response?.message);
  }
};
