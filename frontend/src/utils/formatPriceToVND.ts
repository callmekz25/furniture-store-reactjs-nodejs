const formatPriceToVND = (price: number) => {
  return price
    .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
    .replace(/\./g, ",");
};
export default formatPriceToVND;
