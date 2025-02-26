import httpRequest from "./config";

import IReview from "@/interfaces/review";
const postReview = async (dataReview: IReview) => {
  const { productId } = dataReview;

  const { data } = await httpRequest.post(
    `/product/${productId}/reviews`,
    dataReview
  );
  return data;
};
export { postReview };
