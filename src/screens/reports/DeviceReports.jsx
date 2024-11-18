import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { convertEpochToDateAndTime, getBeforeDate, getCurrentDate } from "../../components/Common/PowerUpFunctions";
import '../deviceInventory/activateDevice.css'
import { deviceDetailLiveByID } from "../../apis/deviceInventory";
import ListTable from "../../components/Common/Listtable/ListTable";
import { BaseURL } from "../../constants/baseURL";


const DeviceReports = () => {

  const fromDate = getBeforeDate(365*5);
  const uptoDate = getCurrentDate();
  const [timeDelta, setTimeDelta] = useState(1)
  const [timeCutoff, setTimeCutoff] = useState(Math.floor((new Date().getTime())/1000)-1*24*60*60)
  const [listData, setListData] = useState([])
  
  // const eid = sessionStorage.getItem("entityId")
  // const userType = sessionStorage.getItem("userType")
  
  const getDevicesList = async () => {
    const myHeaders = new Headers();
    myHeaders.append("accept", "*/*");
    myHeaders.append("Authorization", "Bearer "+ sessionStorage.getItem("token"));

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

  const response = await  fetch(`${BaseURL}/DeviceInventory/getalldevicelistv2?eid=-1&page=1&pageSize=1000&fromDt=${fromDate}&toDt=${uptoDate}&status=1&locate=1&cttatus=1`, requestOptions)
  const response_parsed = await response.json()
  const devicesData = response_parsed?.result?.devicelist
  const ids = devicesData.map(device => device["intuchEntityId"]).join(',');
  const getLocation = await getCurrentLocation(ids);
  const devicesDataWithLocation = devicesData.map(item => {return {...item, location: getLocation[item["intuchEntityId"]]["location"], lastTimeStamp: getLocation[item["intuchEntityId"]]["lastTimeStamp"], lastTimeString:getLocation[item["intuchEntityId"]]["lastTimeString"]}})

  // if(devicesData?.length > 0){
  //     for (let i = 0; i < devicesData.length; i++) {
  //         const getLocation = await getCurrentLocation(devicesData[i]["intuchEntityId"])
  //         devicesDataWithLocation.push({...devicesData[i], location: getLocation["location"], lastTimeStamp: getLocation["lastTimeStamp"], lastTimeString:getLocation["lastTimeString"]})
  //     }
  //   }
    const finalDeviceData = devicesDataWithLocation.filter(item=>item?.lastTimeStamp<timeCutoff)
    setListData(finalDeviceData)
    console.log(finalDeviceData, "DeviceReportResult")
  }

  const getCurrentLocation = async (ids) => {
    try{
        const response = await deviceDetailLiveByID(ids);
        const dictData = {};

        response.data.forEach(item => {
            dictData[item["id"]] = {location: item["address"], lastTimeStamp: item["gps_ts"], lastTimeString:convertEpochToDateAndTime(item["gps_ts"])};
        });

        return dictData
    } catch{
        return {location: "", lastTimeStamp: "", lastTimeString:""}
    }
  }


  useEffect(()=>{
    getDevicesList()
  },[])  

  
  const handleSearch = (e) => {
    e.preventDefault()
    setTimeCutoff(Math.floor((new Date().getTime())/1000)-timeDelta*24*60*60)
    getDevicesList()
  }

  const columns = [
    {
      Header: "Vehicle No",
      accessor: "vehicleRegistrationNumber",
      width: '15%',
      Cell: ({ cell }) => (cell?.row?.original?.vehicleRegistrationNumber || 'N/A')
    },
    {
      Header: "Owner Name",
      accessor: 'ownerName',
      Cell: ({cell}) => (cell?.row?.original?.ownerName || 'N/A')
    },
    {
      Header: "Phone Number",
      accessor: 'ownerPhoneNumber',
      Cell: ({cell}) => (cell?.row?.original?.ownerPhoneNumber || 'N/A')
    },
    {
      Header: "Device Model",
      accessor: 'vltdModelCode',
      Cell: ({cell}) => (cell?.row?.original?.vltdModelCode || 'N/A')
    },
    {
      Header: "Vehicle Category",
      accessor: 'vehicleCategory',
      Cell: ({cell}) => (cell?.row?.original?.vehicleCategory || 'N/A')
    },
    {
      Header: "ESIM Provider",
      accessor: 'esimProvider',
      Cell: ({cell}) => (cell?.row?.original?.esimProvider || 'N/A')
    },
    {
      Header: "ICCID Validity",
      accessor: 'iccidValidUpto',
      Cell: ({cell}) => (cell?.row?.original?.iccidValidUpto || 'N/A')
    },
    {
      Header: "Last Location",
      accessor: 'location',
      Cell: ({cell}) => (cell?.row?.original?.location || 'N/A')
    },
    {
      Header: "Time Stamp",
      accessor: 'lastTimeString',
      Cell: ({cell}) => (cell?.row?.original?.lastTimeString || 'N/A')
    },  
  ]


  return (
    <>
      <form className="filter_container">

        <div className="field_wrapper">
          <label>Select Days</label>
          <select onChange={(e)=>setTimeDelta(e.target.value)}>
            <option value={1}>1 Day</option>
            <option value={3}>3 Days</option>
            <option value={7}>7 Days</option>
            <option value={15}>15 Days</option>
            <option value={30}>30 Days</option>
          </select>
        </div>

        
        <div className="filter_button" onClick={handleSearch}>
          <span>
            <FaFilter size={18} fill="#fff" />
          </span>
          <span>Search</span>
        </div>

      </form>
      
      <div style={{marginTop:"10px"}}>
        {listData?.length > 0 && <ListTable dataList={listData} columns={columns} />}
       
      </div>
    </>
  );
};
export default DeviceReports;







