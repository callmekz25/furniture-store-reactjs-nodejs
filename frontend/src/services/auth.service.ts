import { LoginPayload } from '@/interfaces/auth/login.interface';
import httpRequest from '../config/axios.config';
import IUser from '@/interfaces/user.interface';

export const register = async (user: IUser) => {
  const { data } = await httpRequest.post('/signup', user);
  return data;
};

export const login = async (user: LoginPayload) => {
  const { data } = await httpRequest.post('/signin', user, {
    skipAuthRefresh: true,
  });
  return data;
};

export const verifyEmail = async (otp: string) => {
  const email = sessionStorage.getItem('email');
  const { data } = await httpRequest.post(
    '/verify',
    {
      email,
      otp,
    },
    {
      skipAuthRefresh: true,
    }
  );
  return data;
};

export const resendEmailVerification = async () => {
  const email = sessionStorage.getItem('email');
  const { data } = await httpRequest.post(
    '/resend-verify-email',
    {
      email,
    },
    {
      skipAuthRefresh: true,
    }
  );
  return data;
};

export const logout = async () => {
  const { data } = await httpRequest.post('/logout');
  return data;
};
