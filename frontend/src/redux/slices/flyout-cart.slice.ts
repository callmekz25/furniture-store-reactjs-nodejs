import { createSlice } from "@reduxjs/toolkit";

const flyoutCartSlice = createSlice({
  name: "cart",
  initialState: {
    isOpen: false,
  },
  reducers: {
    openFlyoutCart: (state) => {
      state.isOpen = true;
    },
    closeFlyoutCart: (state) => {
      state.isOpen = false;
    },
  },
});
export const { openFlyoutCart, closeFlyoutCart } = flyoutCartSlice.actions;
export default flyoutCartSlice.reducer;
