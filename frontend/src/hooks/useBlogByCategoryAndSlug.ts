import { getBlogByCategoryAndSlug } from "@/api/blogService";
import { useQuery } from "@tanstack/react-query";

const useBlogByCategoryAndSlug = (slug: string, category: string) => {
  return useQuery({
    queryKey: ["blog", category, slug],
    queryFn: () => getBlogByCategoryAndSlug(slug, category),
    staleTime: 1000 * 60 * 30,
  });
};
export default useBlogByCategoryAndSlug;
