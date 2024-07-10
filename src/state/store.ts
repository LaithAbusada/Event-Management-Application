import { configureStore } from "@reduxjs/toolkit";
import { config } from "dotenv";
import authReducer from "./user/authSlice";
import eventsReducer from "./events/eventsSlice";
// redux store
export const store = configureStore({
  reducer: {
    auth: authReducer,

    events: eventsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
