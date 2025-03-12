interface IProduct {
  _id?: string | undefined;
  title: string;
  sku: string;
  price: number;
  fakePrice: number;
  quantity: number;
  images: string[];
  status: boolean;
  brand: string;
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
