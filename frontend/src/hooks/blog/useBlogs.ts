import { useQuery } from "@tanstack/react-query";

import { getBlogs } from "@/api/blogService";
const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });
};
export default useBlogs;
