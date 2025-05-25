import { useMutation, useQuery } from "@tanstack/react-query";
import { getReviewsByProductId, postReview } from "@/services/reviewService";
import IReview from "@/interfaces/review.interface";
export const useGetReviewsByProductId = (productId: string) => {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => getReviewsByProductId(productId),
    enabled: !!productId,
  });
};

export const useReviewProduct = () => {
  return useMutation({
    mutationFn: (request: IReview) => postReview(request),
  });
};
