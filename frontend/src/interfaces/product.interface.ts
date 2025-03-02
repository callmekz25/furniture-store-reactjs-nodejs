interface IProduct {
  _id?: string | undefined;
  title: string;
  sku: string;
  price: number;
  fakePrice: number;
  quantity: number;
  images: [string];
  status: boolean;
  brand: string;
  category: string;
  collection: string;
  descr: string;
  publish: boolean;
  slug: string;
}
export default IProduct;
