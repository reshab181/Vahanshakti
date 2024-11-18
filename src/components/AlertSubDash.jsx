import React, { useEffect, useState } from 'react';
import { Table } from './DynamicTable';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import BackButton from './Common/BackButton';
import SosInfoForm from '../screens/Mobile/SosInfoForm';
import { useTranslation } from "react-i18next";
import Swal from 'sweetalert2';
import { BaseURL } from '../constants/baseURL';
import ListTableAlarmsDashboard from './Common/Listtable/ListTableAlarmsDashboard';
import { getDeviceAlarmWithList, getSpecificAlarm } from '../apis/dashboard';
import { convertEpochToDateAndTime, getBeforeminutesAgoEpoch, getCurrentDateEpoch } from './Common/PowerUpFunctions';
import { deviceDetailLiveByMultipleIDs } from '../apis/deviceInventory';
import { LoadingWidget } from './loading';

const AlertSubDash = () => {

    const {t} = useTranslation()

    const navigate = useNavigate()
    const params = useParams();
    const location = useLocation();
    const code = location?.state?.code
    const subcode = location?.state?.subcode
    const totalVehicleCount = location?.state?.data?.length
    const devicesList = location?.state?.data
    const [data, setData] = useState([]);
    
    const [toggle, setToggle] = useState(false)
    const [rawDataToggle, setRawDataToggle] = useState(false)
    // const [sosReleaseToggle, setSOSReleaseToggle] = useState(false)
    const [currentData, setCurrentData] = useState(null)
    const [sosReleasePressed, setSOSReleasePressed] = useState(false)
    const [getRawPackets, setGetRawPackets] = useState(false)
    const [fetchedRawPacket, setFetchedRawPacket] = useState(false)
    const [loading, setLoading] = useState(true)

    const userType = sessionStorage.getItem("userType")


    function chunkArray(arr, chunkSize) {
      const result = [];
      for (let i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize));
      }
      return result;
    }
    

    const getAlarmDetails = async (deviceList) => {
    
      let time = {
        start: getBeforeminutesAgoEpoch(60*24),
        end: getCurrentDateEpoch()
      }
  
      const devicebatches = deviceList.length > 100 ? chunkArray(deviceList, 100) : [deviceList]
      
      if(devicebatches.length > 0){

          let alarmDeviceList = {}
          let responseAlarms = []
          for (let i = 0; i < devicebatches.length; i++) {
            const responseAPI = await getDeviceAlarmWithList(devicebatches[i])
            console.log(responseAPI, "getDeviceAlarmWithList02")
            alarmDeviceList = {...alarmDeviceList, ...responseAPI}
            // const responseIntouch = await getSpecificAlarm(devicebatches[i], time, code)
            const responseIntouch = await deviceDetailLiveByMultipleIDs(devicebatches[i])
            console.log(responseIntouch, "getDeviceAlarmWithList02")
            responseAlarms = [...responseAlarms, ...responseIntouch?.data]
          }
          
          const seenVehicles = []
          const finalResponse = []
          const sortedData = [...responseAlarms.sort((a,b)=> {return b?.gps_ts-a?.gps_ts})]
          sortedData.forEach(item => {          
            if(!seenVehicles.includes(item?.id)){
              finalResponse.push({
              "vrn": item["registrationNumber"],
              "alertTimeStamp" : convertEpochToDateAndTime(item["gps_ts"]),
              "alertLocation": item["address"],
              "alertLatitude": item["latitude"],
              "alertLongitude": item["longitude"],
              "alertEpochTime": item["gps_ts"],
              "imei": item["id"] ? alarmDeviceList[item["id"]]["imeiNo"] : "",
              "vltdModelCode": item["id"] ? alarmDeviceList[item["id"]]["vltdModelCode"]:"",
              "ownerName": item["id"] ? alarmDeviceList[item["id"]]["ownerName"]:"",
              "ownerPhoneNumber": item["id"] ? alarmDeviceList[item["id"]]["ownerPhoneNumber"]:"",
              "intuchEntityId": item["id"] ? alarmDeviceList[item["id"]]["intuchEntityId"]:""
              })
              seenVehicles.push(item?.id)
            }
          })
          console.log(finalResponse,"getDeviceAlarmWithList03")
          setLoading(false)
          return finalResponse  
    }}
  
    
    useEffect(()=>{
      if(devicesList.length > 0){
        const code = location?.state?.code
        const subcode = location?.state?.subcode
        getAlarmDetails(devicesList).then((response)=>{
          console.log(response, "getAlarmDetails")
          setData(response)
        })
      }
    }, [devicesList])
  
    const releaseSOS = async (data) => {  
      console.log(data, "SOSReleaseData")
      const datapacket = "+##STOP_MSG"
      const encodedData = encodeURIComponent(datapacket);
      const url = `${BaseURL}/Intuchproxy/devices/${data?.intuchEntityId}/command?type=34&val1=${encodedData}`;
      const myHeaders = new Headers();
      
      myHeaders.append("Authorization", "Bearer "+ sessionStorage.getItem("access_token"));

      const requestOptions = {
          method: "POST",
          headers: myHeaders,
          redirect: "follow"
        };

      
      const response = await fetch(url,requestOptions)
      console.log(url,response.status, "getRawPacketSOSRelease")  
      if(response.status === 200){
        setGetRawPackets(true)
        setSOSReleasePressed(true)
        getRawDataFeed(data?.imei)
        Swal.fire({
          icon: 'success',
          title: 'SOS Release Command Sent Successfully',
          text: ""
        })
      }
    }

    const getRawPacketData = async (imei,time) => {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

      const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
      };
      console.log(imei, "getRawPacketSOSRelease")
      const response = await fetch(`${BaseURL}/Intuchproxy/GetDeviceRaw?imei=${imei}&startTime=${time}&endTime=${time+10*60}&type=3`, requestOptions)
      const response_parsed = await response.json()
      console.log(response_parsed, "getRawPacketSOSRelease")
      if(response_parsed?.data?.length > 0){
          const packetData=response_parsed?.data.filter(item=>item?.raw.includes("EA,11"))
          if(packetData.length>0){
            setFetchedRawPacket(true)
            clearInterval(intervalSOSReleaseId); 
            clearInterval(checkDataSOSReleaseReceived); 
          
            Swal.fire({
              icon: 'success',
              title: 'SOS Released Successfully',
              text: packetData[0]["raw"]
            })
          }
      }  
  }

    const getRawDataFeed = (imei) => {
      let dateTime = new Date();
      let epochTime = dateTime.getTime();
      let epochTimeInSeconds = Math.floor(epochTime/1000)-10

      const intervalSOSReleaseId = setInterval(()=>getRawPacketData(imei,epochTimeInSeconds), 5000);

      const checkDataSOSReleaseReceived = setInterval(() => {
          if (fetchedRawPacket) {
              clearInterval(intervalSOSReleaseId); 
              clearInterval(checkDataSOSReleaseReceived); 
          }
      }, 5000);

      setTimeout(() => {
          clearInterval(intervalSOSReleaseId);
          clearInterval(checkDataSOSReleaseReceived);
      }, 120000); 
  }



    const column = [
        {
        Header: t("deviceList.VehicleRegistrationNumberText"),
        accessor: "vrn",
        width: '15%',
        Cell: ({ cell }) => <>
        <div onClick={() => navigate(`/subDashboard/details/${cell?.row?.original?.intuchEntityId}`, { state: cell?.row?.original })} className="" style={{ display: 'flex', gap: '5px', alignContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
          <span style={{ color: '#42a4f5' }}>{cell?.row?.original?.vrn}</span>
        </div>
      </>
      },
      {
        Header: t("deviceList.TimeStamp"),
        accessor: 'alertTimeStamp',
        Cell: ({cell}) => (cell?.row?.original?.alertTimeStamp || 'N/A')
      },
      {
        Header: t("deviceList.LastLocationText"),
        accessor: 'alertLocation',
        Cell: ({cell}) => (cell?.row?.original?.alertLocation || 'N/A')
      },
      {
        Header: t("deviceList.OwnerNameText"),
        accessor: 'ownerName',
        Cell: ({cell}) => (cell?.row?.original?.ownerName || 'N/A')
      },
      {
        Header: t("deviceList.OwnerPhoneNumberText"),
        accessor: 'ownerPhoneNumber',
        Cell: ({cell}) => (cell?.row?.original?.ownerPhoneNumber || 'N/A')
      },
      {
        Header: t("deviceList.VltdModelCodeText"),
        accessor: 'vltdModelCode',
        Cell: ({cell}) => (cell?.row?.original?.vltdModelCode || 'N/A')
      },
      {
        Header: t("deviceList.ImeiNoText"),
        accessor: 'imei',
        Cell: ({cell}) => (cell?.row?.original?.imei || 'N/A')
      },
      
      
      ]
    
    const additionalColumn = [
      {
        Header: t("basicWord.ActionText"),
        Cell: ({ cell }) => <>
          <button style={{ cursor: 'pointer', backgroundColor: '#f44444', border: '1px solid #f82121', color: 'white', padding: '3px 8px', fontSize: '12px' }} onClick={() => releaseSOS(cell?.row?.original)}>SOS Release</button>
        </>
      }
    ]
    
    const additionalColumnSOSReport = [
      {
        Header: "SOS Action Report",
        Cell: ({ cell }) => <>
          <button style={{ cursor: 'pointer', backgroundColor: 'blue', border: '1px solid blue', color: 'white', padding: '3px 8px', fontSize: '12px' }} onClick={() => navigate(`/police/sosInfoForm/`, { state: cell?.row?.original })}>Action Report</button>
        </>
      }
    ]
    
    console.log(data, "AlertSubDash")
    const finalColumn = location?.state?.code === 24 ? ((userType === "SBU" || userType === "SUA") ? [...column, ...additionalColumn, ...additionalColumnSOSReport] : userType === "POLICE" ? [...column, ...additionalColumnSOSReport] : column):column
    console.log(finalColumn, "AlertSubDashFinalColumn")
    return (
        <>
        {
        toggle ? <SosInfoForm data={currentData} back={() => setToggle(false)} />
          :
          <div>
            <nav className="sub-nav">
              <BackButton />
            </nav>
            <p style={{ margin: "5px 0 10px 10px", fontSize: "16px", fontWeight: "600" }}>Alerts | {params?.alertType}</p>
            <div>
              {data && !loading ? <ListTableAlarmsDashboard totalCount = {totalVehicleCount} dataList={data} columns={finalColumn} heading= {"Alerts | "+params?.alertType}/> : <LoadingWidget/>}
            </div>
          </div>
      }
        </>
        // <>
        
        //   <div>
        //     <nav className="sub-nav">
        //       <BackButton />
        //     </nav>
        //     <p style={{ margin: "5px 0 10px 10px", fontSize: "16px", fontWeight: "600" }}>Alerts | {params?.alertType}</p>
        //     <div>
        //       {data && !loading ? <ListTableAlarmsDashboard totalCount = {totalVehicleCount} dataList={data} columns={finalColumn} heading= {"Alerts | "+params?.alertType}/> : <LoadingWidget/>}
        //     </div>
        //   </div>
      
        // </>
        
        
    );
};

export default AlertSubDash;
