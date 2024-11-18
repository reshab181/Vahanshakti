import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deviceInventory: [
    "Add Device",
    "Map Device to Vehicle",
    "View List of Devices",
    "Device Details",
    "Update Device detail"
  ],
  RTO: ["Add RTO", "Update RTO", "RTO User Management", "RTO Details"],
  Masters: [
    "Add Internet Service Provider",
    "Update Internet Service Provider",
    "Internet Service provider Details",
    "Add ESIM Provider",
    "Update ESIM Provider",
    "ESIM Provider Detail"
  ],
  Manufacturers: [
    "Add Manufacturer",
    "Update Manufacturer",
    "Manufacturer User Management",
    "Manufacturer Details"
  ],
  Distributors: [
    "Add Distributor",
    "Update Distributor",
    "Distributor User Management",
    "Distributor Details"
  ],
  deviceTypes: [
    "Add Device Type",
    "Update Device Type",
    "Device Approval",
    "Approved Device Details"
  ],
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState: initialState,
  reducers: {
    setDeviceInventory (state, action) {
      state.deviceInventory  = action.payload;
    },
    setRTO  (state, action) {
      state.RTO  = action.payload;
    },
    setMasters  (state, action) {
      state.Masters  = action.payload;
    },
    setManufacturers  (state, action) {
      state.Manufacturers   = action.payload;
    },
    setDistributors  (state, action) {
      state.Distributors   = action.payload;
    },
    setDeviceTypes   (state, action) {
      state.deviceTypes    = action.payload;
    }
  },
});

export const { setNavigationOpen } = navigationSlice.actions;
export default navigationSlice.reducer;
