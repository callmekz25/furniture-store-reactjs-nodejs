import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postReview, getReviewsByProductId } from "@/api/review";
const useReview = (productId: string) => {
  const queryClient = useQueryClient();
  const {
    data: reviewData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["review", productId],
    queryFn: () => getReviewsByProductId(productId),
    staleTime: 1000 * 60 * 30, // 30 phút
    enabled: !!productId,
  });
  const postReviewMutation = useMutation({
    mutationFn: postReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["review", productId]); // Gọi lại API để cập nhật giỏ hàng
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
