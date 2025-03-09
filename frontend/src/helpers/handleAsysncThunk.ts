import IUser from "@/interfaces/user.interface";
interface IUserState {
  user: IUser | null;
  loading: boolean;
  error: string | null;
}

const handleAsyncThunk = (builder: any, thunk: any) => {
  builder.addCase(thunk.pending, (state: IUserState) => {
    state.loading = true;
    state.error = null; // Reset error khi bắt đầu request mới
  });
  builder.addCase(thunk.fulfilled, (state: IUserState, action: any) => {
    state.loading = false;
    state.user = action.payload;
  });
  builder.addCase(thunk.rejected, (state: IUserState, action: any) => {
    state.loading = false;
    state.error = action.payload as string;
  });
};
export default handleAsyncThunk;
