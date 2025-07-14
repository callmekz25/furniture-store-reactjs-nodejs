import IPromotion from "@/interfaces/promotion/promotion.interface";
import { addPromotion } from "@/services/promotion.service";
import { useMutation } from "@tanstack/react-query";

export const useAddPromotion = () => {
  return useMutation({
    mutationFn: (payload: IPromotion) => addPromotion(payload),
  });
};
