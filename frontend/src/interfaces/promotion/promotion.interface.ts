interface IPromotion {
  name: string;
  descr: string;
  discountType: "percent" | "fixed";
  discountValue: number;
  scope: {
    productIds: string[];
    categoryIds: string[];
    collectionIds: string[];
  };
  startDate: string;
  endDate: string;
  isActive: boolean;
}
export default IPromotion;
