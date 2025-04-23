import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./slices/flyout-cart.slice";
import filterMenuReducer from "./slices/filter-menu.slice.ts";

import variantReducer from "./slices/variant.slice.ts";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    variant: variantReducer,
    filterMenu: filterMenuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
