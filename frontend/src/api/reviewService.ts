import httpRequest from "./config";

import IReview from "@/interfaces/review.interface";
const postReview = async (dataReview: IReview) => {
  try {
    const { productId } = dataReview;

    const { data } = await httpRequest.post(
      `/products/${productId}/reviews`,
      dataReview
    );
    return data;
  } catch (error: any) {
    throw Error(error?.response?.data?.mess);
  }
};
const getReviewsByProductId = async (productId: string) => {
  try {
    const { data } = await httpRequest.get(`/products/${productId}/reviews`);
    return data;
  } catch (error: any) {
    throw Error(error?.response?.data?.mess);
  }
};
export { postReview, getReviewsByProductId };
