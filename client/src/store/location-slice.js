import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  lng: -122.4194,
  lat: 37.7749,
  name: "San Francisco",
};
const locationSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      return {
        lng: action.payload.lng,
        lat: action.payload.lat,
        name: action.payload.name,
      };
    },
    defaultLocation: () => {
      return {
        lng: -122.4194,
        lat: 37.7749,
        name: "San Francisco",
      };
    },
  },
});

const { reducer, actions } = locationSlice;
export const { setLocation, defaultLocation } = actions;
export default reducer;
