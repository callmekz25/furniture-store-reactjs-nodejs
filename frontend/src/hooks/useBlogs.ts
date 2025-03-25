import { useQuery } from "@tanstack/react-query";

import { getBlogs, getBlogsContentful } from "@/api/blogService";
const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogsContentful,
  });
};
export default useBlogs;
