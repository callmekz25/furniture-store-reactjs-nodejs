import { useQuery } from "@tanstack/react-query";
import { getProductsByCollectionOrCategory } from "@/api/product";

const useProductsByCollectionOrCategory = (
  slug: string,
  searchParams: URLSearchParams
) => {
  return useQuery({
    queryKey: ["products", slug, searchParams.toString()],
    queryFn: () => getProductsByCollectionOrCategory(slug, searchParams),
    staleTime: 1000 * 60 * 30,
  });
};
export default useProductsByCollectionOrCategory;
