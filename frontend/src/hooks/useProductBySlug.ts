import { useQuery } from "@tanstack/react-query";
import { getProductBySlug } from "@/api/product";
const useProducts = (slug: string) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug),
    staleTime: 1000 * 60 * 30,
  });
};
export default useProducts;
