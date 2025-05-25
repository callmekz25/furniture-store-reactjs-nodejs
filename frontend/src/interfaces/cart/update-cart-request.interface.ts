interface IUpdateCartRequest {
  productId: string;
  attributes: string[];
  quantity?: number;
}
export default IUpdateCartRequest;
