interface IUpdateCartRequest {
  productId: string;
  attributes: {
    [key: string]: string;
  } | null;
  quantity?: number;
}
export default IUpdateCartRequest;
