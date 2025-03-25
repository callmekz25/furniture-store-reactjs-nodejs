import IUser from "@/interfaces/user.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUser, logout, registerAccount, signIn } from "@/api/authService";

// Hàm thunk để xử lý bất đồng bộ bên ngoài slice
// Reject lỗi sang payload
export const registerThunk = createAsyncThunk(
  "auth/signup",
  async (user: IUser, { rejectWithValue }) => {
    try {
      const res = await registerAccount(user);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const signInThunk = createAsyncThunk(
  "auth/signin",
  async (user: IUser, { rejectWithValue }) => {
    try {
      const res = await signIn(user);

      return res;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const LogoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await logout();
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserThunk = createAsyncThunk(
  "auth/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUser();
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
