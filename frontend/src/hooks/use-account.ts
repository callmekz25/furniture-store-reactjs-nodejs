import { IAddress } from "@/interfaces/address/address.interface";
import IUser from "@/interfaces/user.interface";
import {
  addAddress,
  deleteAddress,
  getUser,
  updateAddress,
} from "@/services/account.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  return useQuery<IUser>({
    queryKey: ["user"],
    queryFn: getUser,
  });
};
export const useAddAddress = () => {
  return useMutation({
    mutationFn: (payload: IAddress) => addAddress(payload),
  });
};
export const useUpdateAddress = () => {
  return useMutation({
    mutationFn: (payload: IAddress) => updateAddress(payload),
  });
};
export const useDeleteAddress = () => {
  return useMutation({
    mutationFn: (id: string) => deleteAddress(id),
  });
};
