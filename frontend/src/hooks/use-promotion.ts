import IPromotion from "@/interfaces/promotion/promotion.interface";
import { addPromotion, getPromotions } from "@/services/promotion.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetPromotions = () => {
  return useQuery({
    queryKey: ["promotions"],
    queryFn: getPromotions,
  });
};

export const useAddPromotion = () => {
  return useMutation({
    mutationFn: (payload: IPromotion) => addPromotion(payload),
  });
};
