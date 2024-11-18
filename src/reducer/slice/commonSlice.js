import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    navigationOpen: false,
    navigationSlide:false,
    showDashboard:false,
};

const commonSlice = createSlice({
  name: "common",
  initialState: initialState,
  reducers: {
    setNavigationOpen(state, value) {
      state.navigationOpen = value.payload;
    },
    setNavigationSlide(state, value) {
      state.navigationSlide = value.payload;
    },
    setShowDashboard(state,value){
      state.showDashboard = value.payload;
    }
    // setToken(state, value) {
    //   state.token = value.payload;
    // },
  },
});

export const { setNavigationOpen ,setShowDashboard,setNavigationSlide} = commonSlice.actions;
// setToken
export default commonSlice.reducer;