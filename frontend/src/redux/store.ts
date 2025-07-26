import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./slices/flyout-cart.slice";
import filterMenuReducer from "./slices/filter-menu.slice.ts";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    filterMenu: filterMenuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
