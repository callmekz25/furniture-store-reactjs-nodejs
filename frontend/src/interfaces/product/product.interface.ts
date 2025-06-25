import ISelectedVariant from "./selected-variant.interface";

interface IProduct {
  _id?: string | undefined;
  title: string;
  sku: string;
  price: number;
  minPrice: number;
  fakePrice: number;
  quantity: number;
  images: string[];
  status: boolean;
  discount: number;
  brand: string;
  isNew: boolean;
  category: string;
  collection: string[];
  descr: string;
  publish: boolean;
  slug: string;
  variants: ISelectedVariant[];
}
export default IProduct;
