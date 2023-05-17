const { configureStore } = require("@reduxjs/toolkit");
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import modalSlice from "./slices/modalSlice";
import profileSlice from "./slices/profileSlice";
import { useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    profile: profileSlice,
    modal: modalSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export default store;
