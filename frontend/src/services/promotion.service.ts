import httpRequest from "@/config/axios.config";
import IPromotion from "@/interfaces/promotion/promotion.interface";

export const getPromotions = async () => {
  const { data } = await httpRequest.get("/promotions");
  return data;
};

export const getPromotionById = async (id: string) => {
  const { data } = await httpRequest.get(`/promotions/${id}`);
  return data;
};
export const addPromotion = async (payload: IPromotion) => {
  const { data } = await httpRequest.post("/promotions", payload);
  return data;
};
export const updatePromotion = async (payload: IPromotion) => {
  const { data } = await httpRequest.put(`/promotions/${payload._id}`, payload);
  return data;
};
