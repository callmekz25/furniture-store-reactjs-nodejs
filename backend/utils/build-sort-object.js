const buildSortObject = (sortsQuery) => {
  // Cấu trúc query theo sort là key.asc hoặc key.desc
  let sort = {};
  if (sortsQuery) {
    const [key, type] = sortsQuery.split(".");
    const sortKey = key === "price" ? "minPrice" : key;
    const convertSortType = type === "asc" ? 1 : -1;
    sort = { [sortKey]: convertSortType };
  }
  return sort;
};
export default buildSortObject;
