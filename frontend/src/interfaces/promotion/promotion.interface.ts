interface IPromotion {
  name: string;
  descr: string;
  discountType: "percent" | "fixed";
  discountValue: number;
  scope: {
    ids: string[];
    type: "all" | "products" | "collections" | "categories";
  };
  startDate: string;
  endDate: string;
  isActive: boolean;
}
export default IPromotion;
