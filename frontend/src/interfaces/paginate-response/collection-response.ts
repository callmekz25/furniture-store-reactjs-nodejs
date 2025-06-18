import IProduct from "../product/product.interface";

interface CollectionResponse {
  products: IProduct[];
  type: {
    [key: string]: string;
  };
  suppliers: string[];
  total: number;
}
export default CollectionResponse;
