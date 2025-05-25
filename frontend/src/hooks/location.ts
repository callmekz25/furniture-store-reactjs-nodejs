import { useQuery } from "@tanstack/react-query";
import {
  getProvinces,
  getDistrictsByProvinceId,
  getWardsByDistrictId,
} from "@/services/locationService";
export const useGetProvinces = () => {
  return useQuery({
    queryKey: ["provinces"],
    queryFn: getProvinces,
  });
};
export const useGetDistricts = (provinceId: string) => {
  return useQuery({
    queryKey: ["districts", provinceId],
    queryFn: () => getDistrictsByProvinceId(provinceId),
    enabled: !!provinceId,
  });
};
export const useGetWards = (districtId: string) => {
  return useQuery({
    queryKey: ["districts", districtId],
    queryFn: () => getWardsByDistrictId(districtId),
    enabled: !!districtId,
  });
};
