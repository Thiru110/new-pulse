import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: null,
  user: {},
};
export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = null;
      state.user = {};
      localStorage.removeItem("Token");
    },
  },
});

export const { authenticate, logout } = AuthSlice.actions;
