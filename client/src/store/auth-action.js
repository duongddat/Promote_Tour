import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message-slice";

const backendURL = "http://localhost:8080";

const handleAPICall = async (url, method, data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    method: method,
    body: JSON.stringify(data),
  };

  const response = await fetch(`${backendURL}${url}`, config);
  const resData = await response.json();
  return resData;
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const resData = await handleAPICall("/auth/register", "POST", data);
      dispatch(setMessage({ type: resData.status, message: resData.message }));
      if (resData.token) {
        localStorage.setItem("token", resData.token);
      }
      return resData;
    } catch (error) {
      dispatch(setMessage({ type: "error", message: error.message }));
      return rejectWithValue(error.message);
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const resData = await handleAPICall("/auth/login", "POST", data);
      dispatch(setMessage({ type: resData.status, message: resData.message }));
      if (resData.token) {
        localStorage.setItem("token", resData.token);
      }
      return resData;
    } catch (error) {
      dispatch(setMessage({ type: "error", message: error.message }));
      return rejectWithValue(error.message);
    }
  }
);
