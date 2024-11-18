import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  markers: [],
  zoom: 10,
  center: [0, 0], // [latitude, longitude]
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMarkers: (state, action) => {
      state.markers = action.payload;
    },
    setZoom: (state, action) => {
      state.zoom = action.payload;
    },
    setCenter: (state, action) => {
      state.center = action.payload;
    },
  },
});

export const { setMarkers, setZoom, setCenter } = mapSlice.actions;
export default mapSlice.reducer;
