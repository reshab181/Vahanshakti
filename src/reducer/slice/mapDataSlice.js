import { createSlice } from '@reduxjs/toolkit';

export const mapDataSlice = createSlice({
  name: 'mapData',
  initialState: {
    latitudes: [],
    longitudes: [],
    locations: [],
  },
  reducers: {
    setMapData: (state, action) => {
      state.latitudes = action.payload.latitudes;
      state.longitudes = action.payload.longitudes;
      state.locations = action.payload.locations;
    },
  },
});

export const { setMapData } = mapDataSlice.actions;

export default mapDataSlice.reducer;
