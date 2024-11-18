import {combineReducers} from "@reduxjs/toolkit";
import commonReducer from "../reducer/slice/commonSlice"
import mapReducer from "./slice/mapSlice";
import mapDataReducer from '../reducer/slice/mapDataSlice';
import navigationDataReducer from '../reducer/slice/navigationSlice'
import alarmLogReducer from '../reducer/slice/alarmLogSlice'
import liveDeviceReducer from '../reducer/slice/liveDeviceSlice'

const rootReducer  = combineReducers({
    common: commonReducer,
    map: mapReducer,
    mapData:mapDataReducer,
    navigation:navigationDataReducer,
    alarmLog:alarmLogReducer,
    liveDeviceData:liveDeviceReducer
})

export default rootReducer