import { configureStore } from "@reduxjs/toolkit";
import { config } from "dotenv";
import authReducer from "./user/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
