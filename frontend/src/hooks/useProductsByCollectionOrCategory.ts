import { useQuery } from "@tanstack/react-query";
import { getProductsByCollectionOrCategory } from "@/api/product";
const useProductsByCollectionOrCategory = (slug: string) => {
  return useQuery({
    queryKey: ["products", slug],
    queryFn: () => getProductsByCollectionOrCategory(slug),
    staleTime: 1000 * 60 * 30,
  });
};
export default useProductsByCollectionOrCategory;
