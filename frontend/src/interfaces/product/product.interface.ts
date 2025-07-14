import { ICollection } from "../collection/collection.interface";
import IPromotion from "../promotion/promotion.interface";
import ISelectedVariant from "./selected-variant.interface";

interface IProduct {
  _id?: string | undefined;
  title: string;
  sku: string;
  price: number;
  promotion?: IPromotion;
  quantity: number;
  images: string[];
  brand: string;
  categories: string;
  collections: ICollection[];
  descr: string;
  publish: boolean;
  slug: string;
  variants: ISelectedVariant[];
}
export default IProduct;
