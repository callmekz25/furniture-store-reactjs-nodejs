interface IReview {
  _id: string;
  name: string;
  email: string;
  content: string;
  rating: number;
  userId: string;
  productId: string;
  createdAt: string;
}
export default IReview;
