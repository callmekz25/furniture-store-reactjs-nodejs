export const displayScopeType = (scope: string) => {
  let text = "Tất cả sản phẩm";
  if (scope === "products") {
    text = "Sản phẩm cụ thể";
  } else if (scope === "collections") {
    text = "Bộ sưu tập cụ thể";
  }

  return text;
};
