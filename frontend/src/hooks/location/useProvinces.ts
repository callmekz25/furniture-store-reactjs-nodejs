import { useQuery } from "@tanstack/react-query";

import { getProvinces } from "@/api/locationService";
const useProvinces = () => {
  return useQuery({
    queryKey: ["provinces"],
    queryFn: getProvinces,
  });
};
export default useProvinces;
