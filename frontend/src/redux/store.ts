import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import cartReducer from "./slices/flyout-cart.slice";
import filterMenuReducer from "./slices/filter-menu.slice.ts";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import variantReducer from "./slices/variant.slice.ts";

// const persistConfig = {
//   key: "user",
//   storage,
// };
// Lưu state của reducer vô local storage
// const persistedUserReducer = persistReducer(persistConfig, authReducer);
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    variant: variantReducer,

    filterMenu: filterMenuReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false, // Tắt cảnh báo Redux Toolkit
  //   }),
});

// export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
