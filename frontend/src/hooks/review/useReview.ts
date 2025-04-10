import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postReview, getReviewsByProductId } from "@/api/reviewService";

const useReview = (productId: string) => {
  const queryClient = useQueryClient();

  const {
    data: reviewData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => getReviewsByProductId(productId),
    enabled: !!productId,
  });
  const postReviewMutation = useMutation({
    mutationFn: postReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", productId]); // Gọi lại API để cập nhật giỏ hàng
    },
  });
  return {
    reviewData,
    isLoading,
    error,
    postReview: postReviewMutation.mutateAsync,
  };
};

export default useReview;
