import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch as useDispatchOrg, useSelector as useSelectorOrg } from "react-redux";
import { reducer } from "./slice";

export const store = configureStore({
  reducer: {
    panel: reducer,
  },
  middleware: getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useDispatchOrg<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorOrg;
