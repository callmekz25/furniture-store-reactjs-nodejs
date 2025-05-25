import { createSlice } from "@reduxjs/toolkit";

const flyoutCartSlice = createSlice({
  name: "cart",
  initialState: {
    isCartPage: false,
    isOpen: false,
  },
  reducers: {
    setIsCartPage: (state) => {
      state.isCartPage = true;
    },
    setNotCartPage: (state) => {
      state.isCartPage = false;
    },
    openFlyoutCart: (state) => {
      state.isOpen = true;
    },
    closeFlyoutCart: (state) => {
      state.isOpen = false;
    },
  },
});
export const {
  openFlyoutCart,
  closeFlyoutCart,
  setIsCartPage,
  setNotCartPage,
} = flyoutCartSlice.actions;
export default flyoutCartSlice.reducer;
