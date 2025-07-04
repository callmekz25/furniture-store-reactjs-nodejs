import httpRequest from "../config/axios.config";

import IReview from "@/interfaces/review.interface";

export const getReviewsByProductId = async (id: string) => {
  try {
    const { data } = await httpRequest.get(`/products/${id}/reviews`);
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.mess);
  }
};

const postReview = async (request: IReview) => {
  try {
    const { productId } = request;
    const { data } = await httpRequest.post(
      `/products/${productId}/reviews`,
      request
    );
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.mess);
  }
};

export { postReview };
