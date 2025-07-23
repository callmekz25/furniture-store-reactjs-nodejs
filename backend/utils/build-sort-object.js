const buildSortObject = (sortsQuery) => {
  let sort = {};
  if (sortsQuery) {
    const [key, type] = sortsQuery.split(".");
    const sortKey = key === "price" ? "availablePrice" : key;
    const convertSortType = type === "asc" ? 1 : -1;
    sort = { [sortKey]: convertSortType };
  }
  return sort;
};
export default buildSortObject;
