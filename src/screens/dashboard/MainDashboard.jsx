import React, { useEffect, useState } from 'react'
import { Alerts } from "../../components/alertsWidget";
import { MultiCardWidgets } from "../../components/multiCardWidget.jsx";
import MAPLayout from "../../components/map.jsx";
import { getAlarmDetailsByIntouchID, getAlarmDetailsByIntouchIDDashboard, getDevicesWithAlarm } from '../../apis/dashboard.js';
import { alarmsMap } from '../../constants/alarmMap.js';
import { deviceDetailLiveByMultipleIDs, getSubEntityVehicleMappings } from '../../apis/deviceInventory.js';

const MainDashboard = ({navigationOpen}) => {
  
  const [loading, setLoading] = useState(false);
  const [coordinates, setCoordinates] = useState([]);
  const [htmlData, setHtmlData] = useState('');
  const [latestAlarms, setLatestAlarms] = useState(null);
  const [activeDevices, setActiveDevices] = useState(null)
  
  console.log(latestAlarms, "latestAlarmsUUEI")
  const userType = sessionStorage.getItem("userType")
  
  useEffect(()=>{
    latestAlarms?.emergencyAlertON?.length > 0 && changeMapFilteredData(latestAlarms?.emergencyAlertON)
  },[latestAlarms])

  const fetchAlarms = async () => {
    setLoading(true)
    try{
      const response = await getDevicesWithAlarm()
      console.log(response, "getDevicesWithAlarm11")
      if(response?.status && response?.result){
        
        const alarmDataMap = {}
        for(let item of alarmsMap){
          
          Object.keys(response?.result).forEach(alarmItems=>{
              const keysAlarms = alarmItems.split(":")
              console.log(keysAlarms, "keysAlarmsjdhd")    
              if(item?.label in alarmDataMap){

                if(item?.id === parseInt(keysAlarms[2]) && item?.key === parseInt(keysAlarms[3])){
                  alarmDataMap[item?.label] = [...alarmDataMap[item?.label], ...new Set(Object.keys(response?.result[alarmItems]))]
                }
              } else if (!(item?.label in alarmDataMap)){
                if(item?.id === parseInt(keysAlarms[2]) && item?.key === parseInt(keysAlarms[3])){
                  alarmDataMap[item?.label] = [...new Set(Object.keys(response?.result[alarmItems]))]
                }  
              }
              

          })
        }

        console.log(alarmDataMap,activeDevices, "getDevicesWithAlarmIOIO")
       
        Object.keys(alarmDataMap).forEach(item=>{

          let filteredVehicleListForAlarm = alarmDataMap[item].filter(vehicleid=>activeDevices.includes(vehicleid))
          console.log(filteredVehicleListForAlarm, alarmDataMap[item], "alarmDataMap")
          
          alarmDataMap[item] = filteredVehicleListForAlarm
        })
       
       console.log(alarmDataMap, "alarmDataMapIUI")
       setLatestAlarms(alarmDataMap)
       setLoading(false)
      }
    }catch(err){
    setLoading(false)
    console.log(err, "errorDashboard")
    alert("some error happened")
  }}
  
  console.log(activeDevices, "activeDevicesHHD")
  
  useEffect(() => {  
  
    if (activeDevices) {
      fetchAlarms();
    }
  
    const intervalId = setInterval(() => {
      if (activeDevices) {
        fetchAlarms();
      }
    }, 30000);
  
    return () => clearInterval(intervalId);
  
  }, [activeDevices]);

  const getActiveDeviceList = async () => {
    const activeVehicleMap = await getSubEntityVehicleMappings()
    setActiveDevices(activeVehicleMap)
  }
  
  useEffect(()=>{
    getActiveDeviceList()
  },[])

  function chunkArray(arr, chunkSize) {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }
  
    
    const changeMapFilteredData = async(elem) => {
      
      const devicebatches = elem.length > 100 ? chunkArray(elem, 100) : [elem]
      
      if(devicebatches.length > 0){

          let responseAlarms = []
          for (let i = 0; i < devicebatches.length; i++) {
            const responseIntouch = await deviceDetailLiveByMultipleIDs(devicebatches[i])
            console.log(responseIntouch, "getDeviceAlarmWithList02")
            responseAlarms = [...responseAlarms, ...responseIntouch.data]
          }
          
          const seenVehicles = []
          const coordinatesData = []
          const htmlDataNew = []

          responseAlarms.forEach(item => {          
            if(!seenVehicles.includes(item?.id)){
              coordinatesData.push({
                latitude: item.latitude,
                longitude: item.longitude
              })
    
              htmlDataNew.push(`
                <div style='background-color: #fff; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); padding: 10px; max-width: 500px; margin: 0;'>
                  <h2 style='border-bottom: 1px solid gainsboro; padding-bottom: 5px;'>Vehicle Details</h2>
                  <div style='margin: 0px 0;'>
                    <p><strong>Registration Number:</strong> ${item?.name}</p>
                    <p><strong>Latitude:</strong>${item?.latitude}</p>
                    <p><strong>Longitude:</strong>${item?.longitude}</p>
                    <p><strong>Address:</strong> ${item?.address}</p>
                  </div>
                </div>
              `)
              seenVehicles.push(item?.id)
            }
          })
        setCoordinates(prev=>coordinatesData);
        setHtmlData(prev=>htmlDataNew)        
        console.log(coordinatesData, "coordinatesDataDashboard");        
      }
    }

    return (
      <>
          <div className={navigationOpen ? "map-container-shrink" : "map-container-expand"}>
              <MultiCardWidgets
                  alarmsData = {latestAlarms}
                  loading = {loading}
                  alertData = {changeMapFilteredData}
              />
              <div className="map-alert-container">
                  <div className="map-container" >
                      <MAPLayout data={coordinates} htmlData ={htmlData}/>
                  </div>
                  <div className="alert-container">
                      <Alerts
                        alarmsData = {latestAlarms}
                        alertData={changeMapFilteredData}
                      /> 
                  </div>
              </div>
          </div>
      </>
  )

}

export default MainDashboard