import { createSlice } from "@reduxjs/toolkit";
import IUser from "@/interfaces/user.interface";
import {
  signInThunk,
  signUpThunk,
  getUserThunk,
  LogoutThunk,
} from "../actions/auth.action";
import handleAsyncThunk from "@/helpers/handleAsysncThunk";
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
// Slice xử lý phần auth
const authSlice = createSlice({
  name: "auth",
  initialState: intitState,
  reducers: {},
  extraReducers: (builder) => {
    handleAsyncThunk(builder, signInThunk);
    handleAsyncThunk(builder, signUpThunk);
    handleAsyncThunk(builder, getUserThunk);
    builder.addCase(LogoutThunk.pending, (state) => {
      {
        state.loading = true;
      }
    });
    builder.addCase(LogoutThunk.fulfilled, (state) => {
      {
        state.loading = false;
        state.user = null;
      }
    });
    builder.addCase(LogoutThunk.rejected, (state, action) => {
      {
        state.loading = false;
        state.error = action.payload as string;
      }
    });
  },
});
export default authSlice.reducer;
