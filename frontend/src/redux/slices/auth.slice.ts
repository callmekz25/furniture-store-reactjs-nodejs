import { createSlice } from "@reduxjs/toolkit";
import IUser from "@/interfaces/user.interface";
import { signInThunk, signUpThunk } from "../actions/auth.action";
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
  reducers: {
    logOut: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpThunk.pending, (state) => {
      {
        state.loading = true;
      }
    });
    builder.addCase(signUpThunk.fulfilled, (state, action) => {
      {
        state.loading = false;
        state.user = action.payload;
      }
    });
    builder.addCase(signUpThunk.rejected, (state, action) => {
      {
        state.loading = false;
        state.error = action.payload as string;
      }
    });
    builder.addCase(signInThunk.pending, (state) => {
      {
        state.loading = true;
      }
    });
    builder.addCase(signInThunk.fulfilled, (state, action) => {
      {
        state.loading = false;
        state.user = action.payload;
      }
    });
    builder.addCase(signInThunk.rejected, (state, action) => {
      {
        state.loading = false;
        state.error = action.payload as string;
      }
    });
  },
});
export default authSlice.reducer;
