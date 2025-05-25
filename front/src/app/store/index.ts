import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { userModel } from "../../entities/user/model";

export const store = configureStore({
  reducer: {
    user: userModel.reducer,
  },
  devTools: import.meta.env.DEV,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
