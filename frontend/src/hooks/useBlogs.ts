import { useQuery } from "@tanstack/react-query";

import { getBlogs } from "@/api/blogService";
const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
    staleTime: 1000 * 60 * 30,
  });
};
export default useBlogs;
