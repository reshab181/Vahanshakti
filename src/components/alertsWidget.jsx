import React from "react";
import { useNavigate } from "react-router-dom";
import { getDeviceAlarmWithList, getSpecificAlarm } from "../apis/dashboard";
import { getBeforeminutesAgoEpoch, getCurrentDateEpoch } from "./Common/PowerUpFunctions.jsx";
import { useTranslation } from 'react-i18next'


export const Alerts = ({alarmsData,alertData}) => {
  const navigate = useNavigate();
  const {t} = useTranslation()
  console.log(alarmsData, "newAlarmsFetched")
  const getAlerts = {
    status: true,
    message: "Get Successfully!",
    result: [
      
      {   
        id: "otaAlert",
        key: alarmsData?.otaAlert || [] ,
        code: 1124,
        subCode: 1,
        description: t("mainDashboard.OTAUpdateAlertText"),
        icon:  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="7.5" fill="#ED5550"/>
        <path d="M16.75 21.25H12.25C9.25 21.25 8.5 20.5 8.5 17.5V14.5C8.5 11.5 9.25 10.75 12.25 10.75H16.75C19.75 10.75 20.5 11.5 20.5 14.5V17.5C20.5 20.5 19.75 21.25 16.75 21.25Z" fill="#ED5550" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22.375 14.125C23.5 14.125 23.5 14.5 23.5 15.25V16.75C23.5 17.5 23.5 17.875 22.375 17.875" fill="#ED5550"/>
        <path d="M22.375 14.125C23.5 14.125 23.5 14.5 23.5 15.25V16.75C23.5 17.5 23.5 17.875 22.375 17.875" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.7849 14.5C12.0324 15.4825 12.0324 16.5175 11.7849 17.5V14.5Z" fill="#ED5550"/>
        <path d="M11.7849 14.5C12.0324 15.4825 12.0324 16.5175 11.7849 17.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>,
        count: alarmsData?.otaAlert?.length,
      },      
      {
        id: "lowBattery",   
        key: alarmsData?.lowBattery || [],
        code: 129,
        subCode: 1,
        description: t("mainDashboard.LowBatteryText"),
        icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="7.5" fill="#ED5550"/>
        <path d="M16.75 21.25H12.25C9.25 21.25 8.5 20.5 8.5 17.5V14.5C8.5 11.5 9.25 10.75 12.25 10.75H16.75C19.75 10.75 20.5 11.5 20.5 14.5V17.5C20.5 20.5 19.75 21.25 16.75 21.25Z" fill="#ED5550" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22.375 14.125C23.5 14.125 23.5 14.5 23.5 15.25V16.75C23.5 17.5 23.5 17.875 22.375 17.875" fill="#ED5550"/>
        <path d="M22.375 14.125C23.5 14.125 23.5 14.5 23.5 15.25V16.75C23.5 17.5 23.5 17.875 22.375 17.875" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.7849 14.5C12.0324 15.4825 12.0324 16.5175 11.7849 17.5V14.5Z" fill="#ED5550"/>
        <path d="M11.7849 14.5C12.0324 15.4825 12.0324 16.5175 11.7849 17.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>,
        count: alarmsData?.lowBattery?.length || 0,
      },
      {
        id: "mainbatteryDisconnect",     
        key: alarmsData?.mainbatteryDisconnect|| [],
        code: 23,
        subCode: 1,
        description: t("mainDashboard.DisconnectMainBatteryText"),
        icon:  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="7.5" fill="#333333"/>
        <path d="M23.375 14.125C24.5 14.125 24.5 14.5 24.5 15.25V16.75C24.5 17.5 24.5 17.875 23.375 17.875" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12.25 21.25C9.25 21.25 8.5 20.5 8.5 17.5V14.5C8.5 11.5 9.25 10.75 12.25 10.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17.75 10.75C20.75 10.75 21.5 11.5 21.5 14.5V17.5C21.5 20.5 20.75 21.25 17.75 21.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 18L17 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 18L13 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>,
        count: alarmsData?.mainbatteryDisconnect?.length,
      },
      {
        id: "harshCorner",   
        key: alarmsData?.harshCorner || [] ,
        code: 127,
        subCode: 3,
        description: t("mainDashboard.RashTurningText"),
        icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="7.5" fill="#F8182E"/>
        <path d="M20.1972 14.0916C19.9432 13.8368 19.6412 13.6349 19.3087 13.4976C18.9762 13.3603 18.6198 13.2902 18.26 13.2916H12.5344L14.8907 10.9352C14.9934 10.8321 15.0508 10.6926 15.0505 10.5471C15.0502 10.4017 14.9921 10.2624 14.8891 10.1598C14.7861 10.0572 14.6465 9.99969 14.5011 10C14.3556 10.0003 14.2163 10.0584 14.1137 10.1614L11.4011 12.8734C11.1443 13.1304 11 13.4788 11 13.842C11 14.2053 11.1443 14.5537 11.4011 14.8106L14.1137 17.5237C14.1646 17.5747 14.225 17.6152 14.2915 17.6429C14.3581 17.6706 14.4294 17.6849 14.5014 17.685C14.5735 17.6851 14.6449 17.671 14.7115 17.6435C14.7781 17.616 14.8386 17.5757 14.8896 17.5248C14.9407 17.4739 14.9812 17.4135 15.0088 17.347C15.0365 17.2805 15.0508 17.2091 15.0509 17.1371C15.051 17.065 15.0369 16.9936 15.0094 16.927C14.982 16.8604 14.9416 16.7999 14.8907 16.7489L12.5278 14.3876H18.26C18.696 14.3876 19.1142 14.5608 19.4225 14.8691C19.7308 15.1774 19.904 15.5955 19.904 16.0315V19.0795C19.904 19.5155 19.7308 19.9337 19.4225 20.242C19.1142 20.5503 18.696 20.7235 18.26 20.7235H17.6798C17.5345 20.7235 17.3951 20.7812 17.2923 20.884C17.1895 20.9868 17.1318 21.1262 17.1318 21.2715C17.1318 21.4168 17.1895 21.5562 17.2923 21.659C17.3951 21.7618 17.5345 21.8195 17.6798 21.8195H18.26C18.9864 21.8186 19.6828 21.5297 20.1965 21.016C20.7102 20.5024 20.9991 19.8059 21 19.0795V16.0315C21.0012 15.6711 20.9309 15.3141 20.7931 14.9811C20.6552 14.6481 20.4527 14.3458 20.1972 14.0916Z" fill="white" stroke="white" strokeWidth="0.5"/>
        <path d="M21 11L11 21" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>,
        count: alarmsData?.harshCorner?.length,
      },
      {
        id: "geofenceExit",   
        key: alarmsData?.geofenceExit || [],
        code: 26,
        subCode: 3,
        description: t("mainDashboard.GeofenceExitAlertText"),
        icon:  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="7.5" fill="#F39C19"/>
        <path d="M16 13V16.3333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 21.2733H11.96C9.6467 21.2733 8.68004 19.62 9.80004 17.6L11.88 13.8533L13.84 10.3333C15.0267 8.19333 16.9734 8.19333 18.16 10.3333L20.12 13.86L22.2 17.6067C23.32 19.6267 22.3467 21.28 20.04 21.28H16V21.2733Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15.9963 18.3333H16.0023" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>,
        count: alarmsData?.geofenceExit?.length,
      },
      {
        id: "geofenceEntry",   
        key: alarmsData?.geofenceEntry || [],
        code: 26,
        subCode: 2,
        description: t("mainDashboard.GeofenceEntryAlertText"),
        icon:  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="7.5" fill="#F39C19"/>
        <path d="M16 13V16.3333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 21.2733H11.96C9.6467 21.2733 8.68004 19.62 9.80004 17.6L11.88 13.8533L13.84 10.3333C15.0267 8.19333 16.9734 8.19333 18.16 10.3333L20.12 13.86L22.2 17.6067C23.32 19.6267 22.3467 21.28 20.04 21.28H16V21.2733Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15.9963 18.3333H16.0023" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>,
        count: alarmsData?.geofenceEntry?.length,
      },
      // {
      //   id: "routeDeviation",   
      //   key: alarmsData?.routeDeviation || [],
      //   code: 147,
      //   subCode: 0,
      //   description: "Route Deviation",
      //   icon:  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      //   <rect width="32" height="32" rx="7.5" fill="#F39C19"/>
      //   <path d="M16 13V16.3333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      //   <path d="M16 21.2733H11.96C9.6467 21.2733 8.68004 19.62 9.80004 17.6L11.88 13.8533L13.84 10.3333C15.0267 8.19333 16.9734 8.19333 18.16 10.3333L20.12 13.86L22.2 17.6067C23.32 19.6267 22.3467 21.28 20.04 21.28H16V21.2733Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      //   <path d="M15.9963 18.3333H16.0023" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      //   </svg>,
      //   count: alarmsData?.routeDeviation?.length,
      // },
      // {
      //   id: "outOfHourWorking",   
      //   key: alarmsData?.outOfHourWorking || [],
      //   code: 134,
      //   subCode: 0,
      //   description: "Driving out of working hour",
      //   icon:  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      //   <rect width="32" height="32" rx="7.5" fill="#F39C19"/>
      //   <path d="M16 13V16.3333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      //   <path d="M16 21.2733H11.96C9.6467 21.2733 8.68004 19.62 9.80004 17.6L11.88 13.8533L13.84 10.3333C15.0267 8.19333 16.9734 8.19333 18.16 10.3333L20.12 13.86L22.2 17.6067C23.32 19.6267 22.3467 21.28 20.04 21.28H16V21.2733Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      //   <path d="M15.9963 18.3333H16.0023" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      //   </svg>,
      //   count: alarmsData?.outOfHourWorking?.length,
      // },
      { 
        id: "ignitionON",   
        key: alarmsData?.ignitionON || [],
        code: 21,
        subCode: 1,
        description: t("mainDashboard.IgnitionOnText"),
        icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="7.5" fill="#33A328"/>
        <path d="M17.9998 10.5657C18.0019 10.6983 18.0427 10.8274 18.1172 10.9371C18.1917 11.0468 18.2967 11.1323 18.4192 11.1831C19.514 11.6648 20.4398 12.4627 21.0778 13.4745C21.7159 14.4862 22.0369 15.6655 21.9998 16.8611C21.974 18.4524 21.3171 19.9682 20.1736 21.0752C19.0302 22.1822 17.4938 22.7896 15.9025 22.7637C14.3112 22.7379 12.7953 22.081 11.6884 20.9376C10.5814 19.7941 9.97401 18.2577 9.99982 16.6664C10.0014 15.5039 10.3406 14.3669 10.9763 13.3935C11.6119 12.4202 12.5167 11.6525 13.5805 11.1837C13.703 11.1326 13.808 11.0469 13.8824 10.937C13.9569 10.8271 13.9977 10.6978 13.9998 10.5651C14 10.4559 13.9733 10.3483 13.9222 10.2518C13.8711 10.1554 13.797 10.0729 13.7066 10.0117C13.6161 9.95059 13.512 9.91258 13.4034 9.90107C13.2948 9.88956 13.1851 9.9049 13.0838 9.94574C11.5367 10.6165 10.268 11.8 9.4914 13.2968C8.71483 14.7936 8.47784 16.5124 8.82036 18.1635C9.16288 19.8146 10.064 21.2973 11.3719 22.3617C12.6798 23.4261 14.3145 24.0073 16.0008 24.0073C17.6871 24.0073 19.3219 23.4261 20.6298 22.3617C21.9377 21.2973 22.8388 19.8146 23.1813 18.1635C23.5238 16.5124 23.2868 14.7936 22.5102 13.2968C21.7337 11.8 20.465 10.6165 18.9178 9.94574C18.8164 9.90446 18.7064 9.88879 18.5975 9.90013C18.4885 9.91147 18.3841 9.94946 18.2934 10.0107C18.2026 10.072 18.1284 10.1547 18.0772 10.2515C18.026 10.3483 17.9994 10.4562 17.9998 10.5657Z" fill="white" stroke="white" strokeWidth="0.2"/>
        <path d="M16.6668 8.66667C16.6668 8.29848 16.3684 8 16.0002 8C15.632 8 15.3335 8.29848 15.3335 8.66667V12.6667C15.3335 13.0349 15.632 13.3333 16.0002 13.3333C16.3684 13.3333 16.6668 13.0349 16.6668 12.6667V8.66667Z" fill="white" stroke="white" strokeWidth="0.2"/>
        </svg>,
        count: alarmsData?.ignitionON?.length,
      },
      {
        id: "ignitionOff",   
        key: alarmsData?.ignitionOff || [],
        code: 21,
        subCode: 0,
        description: t("mainDashboard.IgnitionOffText"),
        icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="7.5" fill="#F43436"/>
        <path d="M17.9998 10.5657C18.0019 10.6983 18.0427 10.8274 18.1172 10.9371C18.1917 11.0468 18.2967 11.1323 18.4192 11.1831C19.514 11.6648 20.4398 12.4627 21.0778 13.4745C21.7159 14.4862 22.0369 15.6655 21.9998 16.8611C21.974 18.4524 21.3171 19.9682 20.1736 21.0752C19.0302 22.1822 17.4938 22.7896 15.9025 22.7637C14.3112 22.7379 12.7953 22.081 11.6884 20.9376C10.5814 19.7941 9.97401 18.2577 9.99982 16.6664C10.0014 15.5039 10.3406 14.3669 10.9763 13.3935C11.6119 12.4202 12.5167 11.6525 13.5805 11.1837C13.703 11.1326 13.808 11.0469 13.8824 10.937C13.9569 10.8271 13.9977 10.6978 13.9998 10.5651C14 10.4559 13.9733 10.3483 13.9222 10.2518C13.8711 10.1554 13.797 10.0729 13.7066 10.0117C13.6161 9.95059 13.512 9.91258 13.4034 9.90107C13.2948 9.88956 13.1851 9.9049 13.0838 9.94574C11.5367 10.6165 10.268 11.8 9.4914 13.2968C8.71483 14.7936 8.47784 16.5124 8.82036 18.1635C9.16288 19.8146 10.064 21.2973 11.3719 22.3617C12.6798 23.4261 14.3145 24.0073 16.0008 24.0073C17.6871 24.0073 19.3219 23.4261 20.6298 22.3617C21.9377 21.2973 22.8388 19.8146 23.1813 18.1635C23.5238 16.5124 23.2868 14.7936 22.5102 13.2968C21.7337 11.8 20.465 10.6165 18.9178 9.94574C18.8164 9.90446 18.7064 9.88879 18.5975 9.90013C18.4885 9.91147 18.3841 9.94946 18.2934 10.0107C18.2026 10.072 18.1284 10.1547 18.0772 10.2515C18.026 10.3483 17.9994 10.4562 17.9998 10.5657Z" fill="white" stroke="white" strokeWidth="0.2"/>
        <path d="M16.6668 8.66667C16.6668 8.29848 16.3684 8 16.0002 8C15.632 8 15.3335 8.29848 15.3335 8.66667V12.6667C15.3335 13.0349 15.632 13.3333 16.0002 13.3333C16.3684 13.3333 16.6668 13.0349 16.6668 12.6667V8.66667Z" fill="white" stroke="white" strokeWidth="0.2"/>
        </svg>,
        count: alarmsData?.ignitionOff?.length,
      },  
      // {
      //   id: "emergencyAlertOFF",   
      //   key: alarmsData?.emergencyAlertOFF || [],
      //   code: 24,
      //   subCode: 1,
      //   description: t("mainDashboard.EmergencyStateOffText"),
      //   icon:  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      //   <rect width="32" height="32" rx="7.5" fill="#F39C19"/>
      //   <path d="M16 13V16.3333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      //   <path d="M16 21.2733H11.96C9.6467 21.2733 8.68004 19.62 9.80004 17.6L11.88 13.8533L13.84 10.3333C15.0267 8.19333 16.9734 8.19333 18.16 10.3333L20.12 13.86L22.2 17.6067C23.32 19.6267 22.3467 21.28 20.04 21.28H16V21.2733Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      //   <path d="M15.9963 18.3333H16.0023" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      //   </svg>,
      //   count: alarmsData?.emergencyAlertOFF?.length,
      // },  
      // {
      //   id: "mainBatteryReconnected",   
      //   key: alarmsData?.mainBatteryReconnected || [] ,
      //   code: 24,
      //   subCode: 1,
      //   description: t("mainDashboard.ConnecttoMainBatteryText"),
      //   icon:  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      //   <rect width="32" height="32" rx="7.5" fill="#ED5550"/>
      //   <path d="M16.75 21.25H12.25C9.25 21.25 8.5 20.5 8.5 17.5V14.5C8.5 11.5 9.25 10.75 12.25 10.75H16.75C19.75 10.75 20.5 11.5 20.5 14.5V17.5C20.5 20.5 19.75 21.25 16.75 21.25Z" fill="#ED5550" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      //   <path d="M22.375 14.125C23.5 14.125 23.5 14.5 23.5 15.25V16.75C23.5 17.5 23.5 17.875 22.375 17.875" fill="#ED5550"/>
      //   <path d="M22.375 14.125C23.5 14.125 23.5 14.5 23.5 15.25V16.75C23.5 17.5 23.5 17.875 22.375 17.875" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      //   <path d="M11.7849 14.5C12.0324 15.4825 12.0324 16.5175 11.7849 17.5V14.5Z" fill="#ED5550"/>
      //   <path d="M11.7849 14.5C12.0324 15.4825 12.0324 16.5175 11.7849 17.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      //   </svg>,
      //   count: alarmsData?.mainBatteryReconnected?.length,
      // },      
      
    ],
  };

  // const getAlarmDetails = async (deviceList, code, subcode) => {
    
  //   let time = {
  //     start: getBeforeminutesAgoEpoch(60*24*2),
  //     end: getCurrentDateEpoch()
  //   }
    
  //   if(deviceList.length > 0){
      
  //       const alarmDeviceList = await getDeviceAlarmWithList(deviceList)
        
  //       const response = await getSpecificAlarm(deviceList, time, code)
  //       const seenVehicles = []
  //       const finalResponse = []
  //       const sortedData = [...response.sort((a,b)=> {return b?.timestamp-a?.timestamp})]
  //       sortedData.forEach(item => {          
  //         if(!seenVehicles.includes(item?.entityId)){
  //           finalResponse.push({
  //           "vrn": item["entityName"],
  //           "alertTimeStamp" : item["timestampStr"],
  //           "alertLocation": item["address"],
  //           "alertLatitude": item["latitude"],
  //           "alertLongitude": item["longitude"],
  //           "alertEpochTime": item["timestamp"],
  //           "imei": item["entityId"] ? alarmDeviceList[item["entityId"]]["imeiNo"] : "",
  //           "vltdModelCode": item["entityId"] ? alarmDeviceList[item["entityId"]]["vltdModelCode"]:"",
  //           "ownerName": item["entityId"] ? alarmDeviceList[item["entityId"]]["ownerName"]:"",
  //           "ownerPhoneNumber": item["entityId"] ? alarmDeviceList[item["entityId"]]["ownerPhoneNumber"]:"",
  //           "intuchEntityId": item["entityId"] ? alarmDeviceList[item["entityId"]]["intuchEntityId"]:""
  //           })
  //           seenVehicles.push(item?.entityId)
  //         }
  //       })
        
  //       return finalResponse
      
  // }}

  const handleSubmit = async(e, description, code, subcode, uiLabel) => {
    
    e.preventDefault();
    
    let result;
    if (description === "otaAlert") {
      result = alarmsData?.otaAlert||[]
    } else if (description === "lowBattery") {
      result = alarmsData?.lowBattery||[]
    } else if (description === "harshCorner") {
      result = alarmsData?.harshCorner||[]
    } else if (description === "geofenceExit") {
      result = alarmsData?.geofenceExit||[]
    } else if (description === "geofenceEntry") {
      result = alarmsData?.geofenceEntry||[]
    } else if (description === "ignitionON") {
      result = alarmsData?.ignitionON||[]
    } else if (description === "ignitionOff") {
      result = alarmsData?.ignitionOff||[]
    } else if (description === "emergencyAlertOFF") {
      result = alarmsData?.emergencyAlertOFF||[]
    } else if (description === "mainbatteryDisconnect") {
      result = alarmsData?.mainbatteryDisconnect||[]
    } else if (description === "mainBatteryReconnected") {
      result = alarmsData?.mainBatteryReconnected||[]
    } else if (description === "routeDeviation") {
      result = alarmsData?.routeDeviation||[]
    } else if (description === "outOfHourWorking") {
      result = alarmsData?.outOfHourWorking||[]
    }
    
    if(result.length > 0){
      navigate(`/subDashboard/${uiLabel}`, { state: {data: result, code:code} });
    }else{
      navigate(`/dashboard`, );    
    }
  };
  

  
  return (
    <div className="alert-widget-container">
      <header><svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="12" height="24" rx="3" fill="#FFBC99" />
      </svg> <span>Quick Tags</span>
      </header>
      <div className="alert-widget-ul">
        {getAlerts?.result?.map((elem, id) => {
          return (
            <div className="alert-widget-item" key={id} style={{cursor: 'pointer'}} >
                  <span onClick={() => alertData(elem?.key)}>{elem?.icon}</span>
                  <div className="alertWidget" onClick={(e)=>handleSubmit(e,elem["id"], elem["code"], elem["subCode"], elem["description"])}>
                    <span style={{color: '#201F27', fontSize: '14px'}}>{elem?.description}</span>
                    <span style={{color: '#868686', fontSize: '12px'}}>({elem?.count || 0})</span>
                  </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};