import { ICollection } from "../collection/collection.interface";
import IPromotion from "../promotion/promotion.interface";

interface ICartItems {
  productId: string;
  slug: string;
  sku: string;
  image: string;
  title: string;
  collections: ICollection[];
  promotion?: IPromotion;
  finalPrice?: number;
  quantity: number;
  price: number;
  attributes: {
    [key: string]: string;
  } | null;
}
export default ICartItems;
