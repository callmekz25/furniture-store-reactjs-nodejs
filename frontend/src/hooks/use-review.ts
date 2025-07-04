import { useMutation, useQuery } from "@tanstack/react-query";
import { getReviewsByProductId, postReview } from "@/services/review.service";
import IReview from "@/interfaces/review.interface";

export const useGetReviewsByProductId = (id: string) => {
  return useQuery<IReview[]>({
    queryKey: ["reviews", id],
    queryFn: () => getReviewsByProductId(id),
    enabled: !!id,
  });
};
export const useReviewProduct = () => {
  return useMutation({
    mutationFn: (request: IReview) => postReview(request),
  });
};
