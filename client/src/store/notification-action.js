import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message-slice.js";

const backendURL = "http://localhost:8080";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (limit, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState();
      const token = state.auth.token;
      const limitNoti = limit || 6;

      const response = await fetch(
        `${backendURL}/notifications?limit=${limitNoti}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resData = await response.json();
      return resData;
    } catch (error) {
      dispatch(setMessage({ type: "error", message: error.message }));
      return rejectWithValue(error.message);
    }
  }
);

export const fetchNumNotifications = createAsyncThunk(
  "notifications/fetchNumNotifications",
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      const response = await fetch(`${backendURL}/notifications/numNoti`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const resData = await response.json();
      return resData;
    } catch (error) {
      dispatch(setMessage({ type: "error", message: error.message }));
      return rejectWithValue(error.message);
    }
  }
);
