import IDistrict from "@/interfaces/location/district.interface";
import IProvince from "@/interfaces/location/province.interface";
import IWard from "@/interfaces/location/ward.interface";

export const getLocationNameById = (
  list: IProvince[] | IDistrict[] | IWard[],
  id: string
) => {
  return list?.find((item) => item.id === id);
};
