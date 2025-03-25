import { createSlice } from "@reduxjs/toolkit";
import IUser from "@/interfaces/user.interface";
import {
  getUserThunk,
  LogoutThunk,
  registerThunk,
  signInThunk,
} from "../actions/auth.action";

interface IUserState {
  user: IUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  success: boolean;
}
const intitState: IUserState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  success: false,
};
// Slice xử lý phần auth
const authSlice = createSlice({
  name: "auth",
  initialState: intitState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerThunk.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(registerThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    });
    builder.addCase(signInThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signInThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.isAuthenticated = true;
      state.success = true;
    });
    builder.addCase(signInThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    });
    builder.addCase(LogoutThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(LogoutThunk.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.success = true;
      state.isAuthenticated = false;
    });
    builder.addCase(LogoutThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    });
    builder.addCase(getUserThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.success = true;
      state.isAuthenticated = true;
    });
    builder.addCase(getUserThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    });
  },
});
export default authSlice.reducer;
