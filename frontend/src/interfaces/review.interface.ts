interface IReview {
  name: string;
  email: string;
  content: string;
  rating: number;
  userId: string | null;
  productId: string;
}
export default IReview;
