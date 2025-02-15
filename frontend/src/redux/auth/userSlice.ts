import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import IUser from "@/interfaces/user";
import { handleSignUp } from "@/api/user";

interface IUserState {
  user: IUser | null;
  loading: boolean;
  error: string | null;
}
const intitState: IUserState = {
  user: null,
  loading: false,
  error: null,
};
// Hàm thunk để xử lý bất đồng bộ bên ngoài slice
export const signUp = createAsyncThunk(
  "user/signup",
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
const userSlice = createSlice({
  name: "user",
  initialState: intitState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      {
        state.loading = true;
      }
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      {
        state.loading = false;
        state.user = action.payload;
      }
    });
    builder.addCase(signUp.rejected, (state, action) => {
      {
        state.loading = false;
        state.error = action.payload as string;
      }
    });
  },
});
export default userSlice.reducer;
