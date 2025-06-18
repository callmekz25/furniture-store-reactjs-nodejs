import { login, logout, register } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import IUser from "@/interfaces/user.interface";

export const useLogin = () => {
  return useMutation({
    mutationFn: (user: IUser) => login(user),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (user: IUser) => register(user),
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  });
};
