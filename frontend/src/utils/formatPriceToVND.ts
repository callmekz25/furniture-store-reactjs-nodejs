const formatPriceToVND = (price: number, type: boolean = true) => {
  return type
    ? price
        .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
        .replace(/\./g, ",")
    : price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};
export default formatPriceToVND;
