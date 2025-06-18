import { useMutation } from "@tanstack/react-query";
import { postReview } from "@/services/reviewService";
import IReview from "@/interfaces/review.interface";

export const useReviewProduct = () => {
  return useMutation({
    mutationFn: (request: IReview) => postReview(request),
  });
};
