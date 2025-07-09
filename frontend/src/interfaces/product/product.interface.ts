import ISelectedVariant from "./selected-variant.interface";

interface IProduct {
  _id?: string | undefined;
  title: string;
  sku: string;
  price: number;
  quantity: number;
  images: string[];
  brand: string;
  category: string;
  collection: string[];
  descr: string;
  publish: boolean;
  slug: string;
  variants: ISelectedVariant[];
}
export default IProduct;
