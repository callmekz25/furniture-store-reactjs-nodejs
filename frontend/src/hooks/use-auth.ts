import {
  login,
  logout,
  register,
  resendEmailVerification,
  verifyEmail,
} from "@/services/auth.service";
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

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (otp: string) => verifyEmail(otp),
  });
};
export const useResendEmailVerification = () => {
  return useMutation({
    mutationFn: resendEmailVerification,
  });
};
