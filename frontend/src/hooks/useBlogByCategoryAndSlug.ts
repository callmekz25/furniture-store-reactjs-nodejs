import { getBlogByCategoryAndSlug } from "@/api/blogService";
import { useQuery } from "@tanstack/react-query";

const useBlogByCategoryAndSlug = (slug: string, category: string) => {
  return useQuery({
    queryKey: ["blog", category, slug],
    queryFn: () => getBlogByCategoryAndSlug(slug, category),
  });
};
export default useBlogByCategoryAndSlug;
