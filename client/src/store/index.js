import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./message-slice.js";
import authReducer from "./auth-slice.js";
import { authApi } from "./auth-service.js";

const store = configureStore({
  reducer: {
    message: messageReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
