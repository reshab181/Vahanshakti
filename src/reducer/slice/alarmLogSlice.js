import { createSlice } from "@reduxjs/toolkit";
import { getDevicesWithAlarm } from "../../apis/dashboard";


const initialState = {
  overSpeeding: { id: 22, key: 0 },
  geofenceAlert: { id: 22, key: 0 },
  harshAcceleration: { id: 127, key: 1 },
  harshBreaking: { id: 127, key: 2 },
  harshCorner: { id: 127, key: 3 },
  ignitionOff: { id: 21, key: 0 },
  ignitionON: { id: 21, key: 1 },
  mainbatteryDisconnect: { id: 23, key: 1 },
  mainBatteryReconnected: { id: 145, key: 0 },
  lowBattery: { id: 161, key: 1 },
  lowBatteryRemoved: { id: 161, key: 1 },
  deviceOpen: { id: 1122, key: 0 },
  sosTamper: { id: 1122, key: 0 },
  otaAlert: { id: 1122, key: 0 },
  emergencyAlertON: { id: 24, key: 1 },
  emergencyAlertOFF: { id: 24, key: 0 },
};



const alarmLog = createSlice({
  name: "alarmLog",
  initialState,
  reducers: {
    setCurrentAlarmLogs(state, action) {
      state.currentAlarmLogs = action?.payload || null;
    },
    setOverSpeeding(state, action) {
      state.overSpeeding.vehicles = Array.from(new Set([...state.overSpeeding.vehicles, ...Object.keys(action.payload)]));
    },
    setHAData(state, action) {
      console.log(action, "HAcceleration")
      console.log(Array.from(new Set([...state.harshAcceleration.vehicles, ...Object.keys(action.payload)])), "HAcceleration")
      state.harshAcceleration.vehicles = Array.from(new Set([...state.harshAcceleration.vehicles, ...Object.keys(action.payload)]));
    },
    setHBData(state, action) {
      state.harshBreaking.vehicles = Array.from(new Set([...state.harshBreaking.vehicles, ...Object.keys(action.payload)]));
    },
    setHCData(state, action) {
      state.harshCorner.vehicles = Array.from(new Set([...state.harshCorner.vehicles, ...Object.keys(action.payload)]));
    },
    setIgnitionOff(state, action) {
      state.ignitionOff.vehicles = Array.from(new Set([...state.ignitionOff.vehicles, ...Object.keys(action.payload)]));
    },
    setIgnitionON(state, action) {
      state.ignitionON.vehicles = Array.from(new Set([...state.ignitionON.vehicles, ...Object.keys(action.payload)]));
    },
    setMainBatteryDisconnect(state, action) {
      console.log(state, action, "Redis")
      console.log(Array.from(new Set([...state.mainbatteryDisconnect.vehicles, ...Object.keys(action.payload)])), "Redis")
      state.mainbatteryDisconnect.vehicles = Array.from(new Set([...state.mainbatteryDisconnect.vehicles, ...Object.keys(action.payload)]));
    },
    setMainBatteryReconnect(state, action) {
      state.mainBatteryReconnected.vehicles = Array.from(new Set([...state.mainBatteryReconnected.vehicles, ...Object.keys(action.payload)]));
    },
    setLowBattery(state, action) {
      state.lowBattery.vehicles = Array.from(new Set([...state.lowBattery.vehicles, ...Object.keys(action.payload)]));
    },
    setLowBatteryRemoved(state, action) {
      state.lowBatteryRemoved.vehicles = Array.from(new Set([...state.lowBatteryRemoved.vehicles, ...Object.keys(action.payload)]));
    },
    setDeviceOpen(state, action) {
      state.deviceOpen.vehicles = Array.from(new Set([...state.deviceOpen.vehicles, ...Object.keys(action.payload)]));
    },
    setSOSTemper(state, action) {
      state.sosTamper.vehicles = Array.from(new Set([...state.sosTamper.vehicles, ...Object.keys(action.payload)]));
    },
    setOTAChangeAlert(state, action) {
      state.otaAlert.vehicles = Array.from(new Set([...state.otaAlert.vehicles, ...Object.keys(action.payload)]));
    },
    setEmergencyAlertON(state, action) {
      state.emergencyAlertON.vehicles = Array.from(new Set([...state.emergencyAlertON.vehicles, ...Object.keys(action.payload)]));
    },
    setEmergencyAlertOFF(state, action) {
      state.emergencyAlertOFF.vehicles = Array.from(new Set([...state.emergencyAlertOFF.vehicles, ...Object.keys(action.payload)]));
    },

  },
});

export const { setCurrentAlarmLogs, setOverSpeeding, setHAData, setHBData, setHCData, setIgnitionOff, setIgnitionON, setMainBatteryDisconnect, setMainBatteryReconnect, setLowBattery, setLowBatteryRemoved, setDeviceOpen, setSOSTemper, setOTAChangeAlert, seEmergencyAlertON, seEmergencyAlertOFF } = alarmLog.actions;

export const fetchAlarmLogs = () => async (dispatch) => {

  try {

    const res = await getDevicesWithAlarm();
    console.log(res, "device redis");

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const formattedYesterday = `${yesterday.getDate().toString().padStart(2, '0')}${(yesterday.getMonth() + 1).toString().padStart(2, '0')}${yesterday.getFullYear()}`;
    const formattedToday = `${today.getDate().toString().padStart(2, '0')}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getFullYear()}`;

    console.log(`SB:${formattedYesterday}:127:1`, "device alarm data")
    console.log(`SB:${formattedToday}:127:1`, "device alarm data")
    console.log(res[`SB:${formattedYesterday}:127:1`], "device alarm data")
    console.log(res[(`SB:${formattedToday}:127:1`)], "device alarm data")

    dispatch(setCurrentAlarmLogs("alarm logs"));
    dispatch(setMainBatteryDisconnect(res[(`SB:${formattedYesterday}:23:0`)]));
    dispatch(setMainBatteryReconnect(res[(`SB:${formattedYesterday}:23:1`)]));
    dispatch(setOverSpeeding(res[(`SB:${formattedYesterday}:22:0`)]));
    dispatch(setHAData(res[(`SB:${formattedYesterday}:127:1`)]));
    dispatch(setHBData(res[(`SB:${formattedYesterday}:127:2`)]));
    dispatch(setHCData(res[(`SB:${formattedYesterday}:127:3`)]));
    dispatch(setIgnitionOff(res[(`SB:${formattedYesterday}:21:0`)]));
    dispatch(setIgnitionON(res[(`SB:${formattedYesterday}:21:0`)]));
    dispatch(setLowBattery(res[(`SB:${formattedYesterday}:161:0`)]));
    dispatch(setLowBatteryRemoved(res[(`SB:${formattedYesterday}:145:0`)]));
    dispatch(setDeviceOpen(res[(`SB:${formattedYesterday}:23:0`)]));
    dispatch(setSOSTemper(res[(`SB:${formattedYesterday}:1122:0`)]));
    dispatch(setOTAChangeAlert(res[(`SB:${formattedYesterday}:23:0`)]));
    dispatch(seEmergencyAlertON(res[(`SB:${formattedYesterday}:24:0`)]));
    dispatch(seEmergencyAlertOFF(res[(`SB:${formattedYesterday}:24:0`)]));

    dispatch(setMainBatteryDisconnect(res[(`SB:${formattedToday}:23:0`)]));
    dispatch(setMainBatteryReconnect(res[(`SB:${formattedToday}:23:1`)]));
    dispatch(setOverSpeeding(res[(`SB:${formattedToday}:22:0`)]));
    dispatch(setHAData(res[(`SB:${formattedToday}:127:1`)]));
    dispatch(setHBData(res[(`SB:${formattedToday}:127:2`)]));
    dispatch(setHCData(res[(`SB:${formattedToday}:127:3`)]));
    dispatch(setIgnitionOff(res[(`SB:${formattedToday}:21:0`)]));
    dispatch(setIgnitionON(res[(`SB:${formattedToday}:21:0`)]));
    dispatch(setLowBattery(res[(`SB:${formattedToday}:161:0`)]));
    dispatch(setLowBatteryRemoved(res[(`SB:${formattedToday}:145:0`)]));
    dispatch(setDeviceOpen(res[(`SB:${formattedToday}:23:0`)]));
    dispatch(setSOSTemper(res[(`SB:${formattedToday}:1122:0`)]));
    dispatch(setOTAChangeAlert(res[(`SB:${formattedToday}:23:0`)]));
    dispatch(seEmergencyAlertON(res[(`SB:${formattedToday}:24:0`)]));
    dispatch(seEmergencyAlertOFF(res[(`SB:${formattedToday}:24:0`)]));

  } catch (error) {
    console.error('Error fetching alarm logs:', error);
  }
};

export default alarmLog.reducer;
