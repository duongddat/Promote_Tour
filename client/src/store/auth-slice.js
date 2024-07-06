/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { userLogin, registerUser } from "./auth-action";
import { fetchNotifications } from "./notification-action";

const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  token,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload.data.user;
    },
    setUser: (state, { payload }) => {
      state.token = payload.token;
      state.userInfo = payload.userInfo;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload.data ? payload.data.user : null;
        state.token = payload.data ? payload.token : null;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload.data ? payload.data.user : null;
        state.token = payload.data ? payload.token : null;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

const { reducer, actions } = authSlice;
export const { logout, setCredentials, setUser } = actions;
export default reducer;
