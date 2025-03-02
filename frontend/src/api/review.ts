import httpRequest from "./config";

import IReview from "@/interfaces/review.interface";
const postReview = async (dataReview: IReview) => {
  const { productId } = dataReview;

  const { data } = await httpRequest.post(
    `/products/${productId}/reviews`,
    dataReview
  );
  return data;
};
const getReviewsByProductId = async (productId: string) => {
  const { data } = await httpRequest.get(`/products/${productId}/reviews`);
  return data;
};
export { postReview, getReviewsByProductId };
