import { useQuery } from "@tanstack/react-query";
import { getRelatedProducts } from "@/api/productService";
const useRelatedProductsBySlug = (slug: string, limit?: number) => {
  return useQuery({
    queryKey: ["relatedProducts", slug, limit],
    queryFn: () => getRelatedProducts(slug, limit),
  });
};
export default useRelatedProductsBySlug;
