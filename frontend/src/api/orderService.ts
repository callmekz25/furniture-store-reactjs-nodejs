import ICart from "@/interfaces/cart.interface";
import httpRequest from "./config";

export const createOrderDraft = async ({
  note,
  products,
  total_price,
  total_items,
}: {
  note: string;
  products: ICart;
  total_price: number;
  total_items: number;
}) => {
  try {
    const { data } = await httpRequest.post("/checkouts", {
      note,
      products,
      total_price,
      total_items,
    });
    return data;
  } catch (error) {
    throw new Error("Lỗi xảy ra vui lòng thử lại!");
  }
};
export const getCheckoutOrderByOrderId = async (orderId: string) => {
  try {
    const { data } = await httpRequest.get(`/checkouts/${orderId}`);
    return data;
  } catch (error) {
    throw new Error("Lỗi xảy ra vui lòng thử lại!");
  }
};
