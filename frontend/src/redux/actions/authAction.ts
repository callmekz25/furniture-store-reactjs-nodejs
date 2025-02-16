import IUser from "@/interfaces/user";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleSignIn, handleSignUp } from "@/api/user";

// Hàm thunk để xử lý bất đồng bộ bên ngoài slice
export const signUp = createAsyncThunk(
  "auth/signup",
  async (user: IUser, { rejectWithValue }) => {
    try {
      const res = await handleSignUp(user);
      return res;
    } catch (error: any) {
      // Quăng lỗi từ server qua payload để hiển thị
      return rejectWithValue(error.response.data.mess);
    }
  }
);
export const signIn = createAsyncThunk(
  "auth/signin",
  async (user: IUser, { rejectWithValue }) => {
    try {
      const res = await handleSignIn(user);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response.data.mess);
    }
  }
);
