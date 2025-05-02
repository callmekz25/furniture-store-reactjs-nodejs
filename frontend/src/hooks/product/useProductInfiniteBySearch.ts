import { getProductsBySearchTerm } from "@/api/productService";
import { useInfiniteQuery } from "@tanstack/react-query";

const useProductInfiniteBySearch = (query: string) => {
  return useInfiniteQuery({
    queryKey: ["search", query, "all"],
    enabled: !!query,
    queryFn: ({ pageParam }) => getProductsBySearchTerm(query, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // lastPage là object chứa response api mỗi lần trả về
      // allPage là array chứa các lastPage của tất cẩ response api trả về

      const limit = import.meta.env.VITE_LIMIT;

      return lastPage.products.length === Number(limit)
        ? allPages.length + 1
        : undefined;
    },
  });
};
export default useProductInfiniteBySearch;
