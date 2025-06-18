import IProduct from "../product/product.interface";

interface SearchResponse {
  products: IProduct[];
  total: number;
}
export default SearchResponse;
