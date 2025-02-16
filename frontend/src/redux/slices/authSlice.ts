import { createSlice } from "@reduxjs/toolkit";
import IUser from "@/interfaces/user";
import { signIn, signUp } from "../actions/authAction";
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

const authSlice = createSlice({
  name: "auth",
  initialState: intitState,
  reducers: {
    logOut: (state) => {
      state.user = null;
    },
  },
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
    builder.addCase(signIn.pending, (state) => {
      {
        state.loading = true;
      }
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      {
        state.loading = false;
        state.user = action.payload.data;
      }
    });
    builder.addCase(signIn.rejected, (state, action) => {
      {
        state.loading = false;
        state.error = action.payload as string;
      }
    });
  },
});
export default authSlice.reducer;
