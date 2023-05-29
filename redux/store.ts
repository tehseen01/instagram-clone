const { configureStore } = require("@reduxjs/toolkit");
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import modalSlice from "./slices/modalSlice";
import profileSlice from "./slices/profileSlice";
import { useSelector } from "react-redux";
import followSlice from "./slices/followSlice";

const store = configureStore({
  reducer: {
    profile: profileSlice,
    modal: modalSlice,
    follow: followSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
