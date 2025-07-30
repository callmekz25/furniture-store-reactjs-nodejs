import { IOptionMultiSelect } from "../multi-select/option.interface";

interface IPromotion {
  _id: string;
  name: string;
  descr: string;
  discountValue: number;
  scope: {
    ids: string[] | IOptionMultiSelect[];
    type: "all" | "products" | "collections" | "categories";
  };
  startDate: string;
  endDate: string;
  isActive: boolean;
}
export default IPromotion;
