const buildQueryProduct = ({ query, supplierQuery, priceQuery }) => {
  const mergeQuery = { ...query };
  if (supplierQuery) {
    const supplierQueryArray = Array.isArray(supplierQuery)
      ? supplierQuery
      : [supplierQuery];
    mergeQuery.brand = { $in: supplierQueryArray.map((s) => s.toUpperCase()) };
  }
  // Cấu trúc của query theo price là min-max
  if (priceQuery) {
    const priceQueryArray = Array.isArray(priceQuery)
      ? priceQuery
      : [priceQuery];
    const priceQueryArraySplit = priceQueryArray.map((price) => {
      const [min, max] = price.split("-").map(Number);
      return { min, max };
    });
    mergeQuery.$or = priceQueryArraySplit.map(({ min, max }) => ({
      minPrice: {
        $gte: min,
        $lte: max,
      },
    }));
  }
  return mergeQuery;
};
export default buildQueryProduct;
