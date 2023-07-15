import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "../features/stateSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    state: stateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
