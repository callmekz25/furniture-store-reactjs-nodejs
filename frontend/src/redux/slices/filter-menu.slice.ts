import { createSlice } from "@reduxjs/toolkit";

const filterMenuSlice = createSlice({
  name: "filter-menu",
  initialState: {
    isOpenMenuFilter: false,
  },
  reducers: {
    openFilterMenu: (state) => {
      state.isOpenMenuFilter = true;
    },
    closeFilterMenu: (state) => {
      state.isOpenMenuFilter = false;
    },
  },
});

export const { openFilterMenu, closeFilterMenu } = filterMenuSlice.actions;
export default filterMenuSlice.reducer;
