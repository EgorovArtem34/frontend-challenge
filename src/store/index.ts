import { configureStore } from "@reduxjs/toolkit";
import catsSlice from "./slices/catsSlice";

const store = configureStore({
  reducer: {
    catsSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
