import IPromotion from "@/interfaces/promotion/promotion.interface";
import {
  addPromotion,
  getPromotionById,
  getPromotions,
  updatePromotion,
} from "@/services/promotion.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetPromotions = () => {
  return useQuery({
    queryKey: ["promotions"],
    queryFn: getPromotions,
  });
};

export const useGetPromotionById = (id: string) => {
  return useQuery({
    queryKey: ["promotions", id],
    queryFn: () => getPromotionById(id),
    enabled: !!id,
  });
};

export const useAddPromotion = () => {
  return useMutation({
    mutationFn: (payload: IPromotion) => addPromotion(payload),
  });
};
export const useUpdatePromotion = () => {
  return useMutation({
    mutationFn: (payload: IPromotion) => updatePromotion(payload),
  });
};
