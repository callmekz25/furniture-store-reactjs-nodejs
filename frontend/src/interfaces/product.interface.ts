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
  variants: [
    {
      status: boolean;
      sku: string;
      name: string;
      images: string[];
      price: number;
      fakePrice: number;
      quantity: number;
      attributes: object;
    }
  ];
}
export default IProduct;
