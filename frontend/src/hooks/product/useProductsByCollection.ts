import { useQuery } from "@tanstack/react-query";
import { getProductsByCollection } from "@/api/productService";
const useProductsByCollection = (slug: string, limit?: number) => {
  return useQuery({
    queryKey: ["products", slug, limit],
    queryFn: () => getProductsByCollection(slug, limit),
  });
};
export default useProductsByCollection;
