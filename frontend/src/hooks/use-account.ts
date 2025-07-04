import IUser from "@/interfaces/user.interface";
import { getUser } from "@/services/account.service";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  return useQuery<IUser>({
    queryKey: ["user"],
    queryFn: getUser,
  });
};
