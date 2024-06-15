import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  type: "",
  message: "",
};
const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      return {
        type: action.payload.type,
        message: action.payload.message,
      };
    },
    clearMessage: () => {
      return { type: "", message: "" };
    },
  },
});

const { reducer, actions } = messageSlice;
export const { setMessage, clearMessage } = actions;
export default reducer;
