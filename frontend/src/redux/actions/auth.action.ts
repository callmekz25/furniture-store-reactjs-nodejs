import IUser from "@/interfaces/user.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleSignIn, handleSignUp, getUser } from "@/api/authService";

// Hàm thunk để xử lý bất đồng bộ bên ngoài slice
export const signUpThunk = createAsyncThunk(
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
export const signInThunk = createAsyncThunk(
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

export const getUserThunk = createAsyncThunk(
  "auth/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUser();
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response.data.mess);
    }
  }
);
