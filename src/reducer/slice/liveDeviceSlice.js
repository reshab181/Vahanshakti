import { createSlice } from "@reduxjs/toolkit";
import { getAllDeviceData } from "../../apis/dashboard";

const initialState = {
    deviceData:[],
};

const liveDeviceSlice = createSlice({
  name: "liveDeviceData",
  initialState: initialState,
  reducers: {
    setDeviceData(state, value) {
      state.deviceData = value.payload;
    }
  },
});

export const { setDeviceData } = liveDeviceSlice.actions;

export const fetchDeviseInTouchID = () => async (dispatch) => {
    try {
      const response = await getAllDeviceData();
      const deviceDetails = response.data;
      dispatch(setDeviceData(deviceDetails));
    } catch (error) {
      console.error('Error fetching alarm logs:', error);
    }
  };

export default liveDeviceSlice.reducer;