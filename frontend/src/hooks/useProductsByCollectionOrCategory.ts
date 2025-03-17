import { useInfiniteQuery } from "@tanstack/react-query";
import { getProductsByCollectionOrCategory } from "@/api/productService";

const useProductsByCollectionOrCategory = (
  slug: string,
  searchParams: URLSearchParams
) => {
  return useInfiniteQuery({
    queryKey: ["collections", slug, searchParams.toString()],
    staleTime: 1000 * 60 * 30,
    queryFn: ({ pageParam }) =>
      getProductsByCollectionOrCategory(pageParam, slug, searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // lastPage là object chứa response api mỗi lần trả về
      // allPage là array chứa các lastPage của tất cẩ response api trả về
      const limit = import.meta.env.LIMIT;

      return lastPage.products.length >= limit
        ? allPages.length + 1
        : undefined;
    },
  });
};
export default useProductsByCollectionOrCategory;
