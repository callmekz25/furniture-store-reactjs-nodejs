import { useQuery } from "@tanstack/react-query";
import { getProductsByCollectionWithLimit } from "@/api/productService";
const useProducts = (slug: string) => {
  return useQuery({
    queryKey: ["products-limit", slug],
    queryFn: () => getProductsByCollectionWithLimit(slug),
    staleTime: 1000 * 60 * 30,
  });
};
export default useProducts;
