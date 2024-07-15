import { createSlice } from "@reduxjs/toolkit";
import { pick } from "lodash";
import { UserState, User } from "@/interfaces/UserInterface";

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const userValues = pick(action.payload, [
        "email",
        "name",
        "nickname",
        "sid",
      ]);
      state.isAuthenticated = true;
      state.user = userValues;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
