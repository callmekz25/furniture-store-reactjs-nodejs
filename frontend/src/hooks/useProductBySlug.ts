import { useQuery } from "@tanstack/react-query";
import { getProductBySlug } from "@/api/productService";
const useProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug),
    cacheTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 30,
  });
};
export default useProductBySlug;
