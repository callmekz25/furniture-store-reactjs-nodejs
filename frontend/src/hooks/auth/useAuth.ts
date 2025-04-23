import { getUser, login, logout, register } from "@/api/authService";
import IUser from "@/interfaces/user.interface";
import { useMutation, useQuery } from "@tanstack/react-query";

const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
};
const useLogin = () => {
  return useMutation({
    mutationFn: (user: IUser) => login(user),
  });
};
const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  });
};
const useRegister = () => {
  return useMutation({
    mutationFn: (user: IUser) => register(user),
  });
};
export default useUser;
export { useLogin, useLogout, useRegister };
