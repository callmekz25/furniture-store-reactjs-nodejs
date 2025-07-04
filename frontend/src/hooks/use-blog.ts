import { getBlogByCategoryAndSlug, getBlogs } from "@/services/blog.service";
import { useQuery } from "@tanstack/react-query";

export const useGetBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });
};

export const useGetBlogsByCategoryAndSlug = (
  slug: string,
  category: string
) => {
  return useQuery({
    queryKey: ["blog", category, slug],
    queryFn: () => getBlogByCategoryAndSlug(slug, category),
    enabled: !!slug && !!category,
  });
};
