import { createSlice } from "@reduxjs/toolkit";
import {
  fetchNotifications,
  fetchNumNotifications,
} from "./notification-action";
const initialState = {
  fcmToken: null,
  loadNoti: true,
  listNoti: [],
  numNoti: 0,
  loadingNoti: false,
  errorNoti: null,
};

const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState,
  reducers: {
    setFcmToken: (state, action) => {
      state.fcmToken = action.payload;
    },
    setLoadNoti: (state) => {
      state.loadNoti = true;
    },
    setNumNotification: (state, action) => {
      if (!state.loadNoti) {
        state.loadNoti = true;
      }
      state.numNoti = action.payload || 0;
    },
    addNotification: (state, action) => {
      state.listNoti.push(action.payload);
    },
    setNotifications: (state, action) => {
      state.listNoti = action.payload.notifications || [];
    },
    clearNotifications: (state) => {
      state.listNoti = [];
    },
    defaultNoti: () => {
      console.log("DefaultNoti");
      return {
        listNoti: [],
        numNoti: 0,
        loading: false,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loadingNoti = true;
        state.errorNoti = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loadNoti = false;
        state.loadingNoti = false;
        state.listNoti = action.payload.data.notifications || [];
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loadNoti = false;
        state.loadingNoti = false;
        state.errorNoti = action.payload.error;
      })
      .addCase(fetchNumNotifications.pending, (state) => {
        state.loadingNoti = true;
        state.errorNoti = null;
      })
      .addCase(fetchNumNotifications.fulfilled, (state, action) => {
        state.loadingNoti = false;
        state.numNoti = action.payload.data.numNoti || 0;
      })
      .addCase(fetchNumNotifications.rejected, (state, action) => {
        state.loadingNoti = false;
        state.errorNoti = action.payload.error;
      });
  },
});

const { reducer, actions } = notificationSlice;
export const {
  setFcmToken,
  setNumNotification,
  addNotification,
  setNotifications,
  clearNotifications,
  defaultNoti,
} = actions;
export default reducer;
