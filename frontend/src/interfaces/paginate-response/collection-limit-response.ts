import IProduct from "../product/product.interface";

interface ICollectionLimitResponse {
  products: IProduct[];
  total: number;
}
export default ICollectionLimitResponse;
