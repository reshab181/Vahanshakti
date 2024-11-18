import React, { useEffect, useState } from "react";
import { BaseURL } from "../../../constants/baseURL";
import { useNavigate } from "react-router-dom";
import { FaFilter } from 'react-icons/fa6'
import Swal from "sweetalert2";
import { getBeforeDate, getCurrentDate } from "../../../components/Common/PowerUpFunctions";
import '../style.css'
import ListTableActivatedDeviceData from "../../../components/Common/ListTableBP/ListTableDeviceData";
import OtaCommandScreenUI from "../OTACommandScreenUI";
import HealthPacketDetails from "../HealthPacketDetails";
import { useTranslation } from "react-i18next";
import RawDataCollected from "../RawDataCollected";
import DeviceNotSendingData from "../../../components/Common/ListTableBP/DeviceNotSendingData";


export const ManufacturerActivatedDevice = () => {

  const {t} = useTranslation()

  const [status, setStatus] = useState("activated_devices")
  const [activationStatus, setActivationStatus] = useState(1)
  const [locateStatus, setLocateStatus] = useState(1)
  const [ctApprovalStatus, setCtApprovalStatus] = useState(1)
  const [changeData, setChangeData] = useState(0)
  const [fromDate, setFromDate] = useState(getBeforeDate(90))
  const [uptoDate, setUptoDate] = useState(getCurrentDate())
  const [commandView, setCommandView] = useState(false)
  const [currentInventory, setCurrentInventory] = useState(null)
  const [healtPacketView, setHealthPacketView] = useState(false)
  const [searchIMEI, setSearchIMEI] = useState("")
  const [rawDataToggle, setRawDataToggle] = useState(false)
  
  const navigate = useNavigate() 

  useEffect(()=>{
    if(status === "activated_devices"){
        setActivationStatus(1)
        setLocateStatus(1)
        setCtApprovalStatus(1)
    } else if (status === "pending_activation"){
        setActivationStatus(0)
        setLocateStatus(-1)
        setCtApprovalStatus(1)
    } else if (status === "deactivated_devices"){
        setActivationStatus(5)
        setLocateStatus(-1)
        setCtApprovalStatus(-1)
    } else if (status === "rejected_devices"){
        setActivationStatus(0)
        setLocateStatus(0)
        setCtApprovalStatus(2)
    }
    setChangeData(changeData + 1)
  },[status])

  let userType = sessionStorage.getItem("userType");
  let eid = sessionStorage.getItem("entityId");
  
  const openRawCollection = (obj) => {
    setCurrentInventory(obj)
    setRawDataToggle(true)
  }

  
  const filterFun = () => {
    let todayDate = getCurrentDate()

    if (fromDate > uptoDate) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'From date must be less than Upto Date'
      })
      return;
    }

    if (uptoDate > todayDate) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Upto date must be less than or equal to Today's Date"
      })
      return;
    }

    if (uptoDate < fromDate) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Upto date must be greater or equal to From Date'
      })
      return;
    }
  }

  const openOtaActionView = (obj) => {
    setCommandView(true)
    setCurrentInventory(obj)
  }

  const openHealthPacketView = (obj) => {
    setHealthPacketView(true)
    setCurrentInventory(obj)
  }

  
  const column = [
    {
      Header: t('deviceList.VehicleRegistrationNumberText'),
      accessor: "vehicleRegistrationNumber",
      width: "10%",
      Cell: ({ cell }) => <>
        <div onClick={() => navigate(`/deviceInventory/details/${cell?.row?.original?.imeiNo}`, { state: cell?.row?.original })} className="" style={{ display: 'flex', gap: '5px', alignContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
          <span style={{ color: '#42a4f5' }}>{cell?.row?.original?.vehicleRegistrationNumber}</span>
        </div>
      </>
    },
    {
        Header: t('deviceList.VltdModelCodeText'),
        accessor: "vltdModelCode",
        width: "5%",
        Cell: ({ cell }) => (cell?.row?.original?.vltdModelCode || "")
    },
    {
      Header: t('deviceList.ImeiNoText'),
      accessor: "imeiNo",
      width: "5%",
      Cell: ({ cell }) => (cell?.row?.original?.imeiNo || "")
    },
    {
        Header: t('deviceList.EsimProviderText'),
        accessor: "esimProvider",
        Cell: ({ cell }) => (cell?.row?.original?.esimProvider || "")
    },
    {
      Header: t('deviceList.IccidNumberText'),
      accessor: "iccidNumber",
      Cell: ({ cell }) => (cell?.row?.original?.iccidNumber || "")
    },
    {
        Header: t('deviceList.ValidUptoText'),
        accessor: "iccidValidUpto",
        Cell: ({ cell }) => (cell?.row?.original?.iccidValidUpto || "")
    },
    {
        Header: t('deviceList.RtoText'),
        accessor: "rto",
        Cell: ({ cell }) => (cell?.row?.original?.rto || "")
    },
    {
        Header: t('deviceList.LastLocationText'),
        accessor: "location",
        width: "20%",
        Cell: ({ cell }) => (cell?.row?.original?.location || ""),
        
    },
    {
        Header: t('deviceList.TimeStamp'),
        accessor: "timestamp",
        Cell: ({ cell }) => (cell?.row?.original?.timestamp || "")
    },
    {
      Header: t('deviceList.SpeedText'),
      accessor: "speed",
      Cell: ({ cell }) => (cell?.row?.original?.speed || "")
  },
  ]

  

  return (
    <>
      {/* {
        commandView && !healtPacketView && !rawDataToggle &&
        <>
          <OtaCommandScreenUI setCommandView={setCommandView} inventory={currentInventory} />
        </>
      } */}

      {
        !commandView && healtPacketView && !rawDataToggle &&
        <>
          <HealthPacketDetails setHealthPacketView={setHealthPacketView} inventory={currentInventory} />
        </>
      }
      {
        !commandView && !healtPacketView && rawDataToggle &&
        <>
          <RawDataCollected setRawDataToggle={setRawDataToggle} inventory={currentInventory} />
        </>
      }

      {
        !commandView && !healtPacketView  && !rawDataToggle &&
        <>

          {/* Top Container */}
          <div className="alarm_header">

            {/* Heading */}
            <div className='heading_container'>
              DEVICE INVENTORY LIST
            </div>
          </div>

          <div style={{display:"grid", gridTemplateColumns:"2fr 1fr"}}>
            <form className="filter_container">

              <div className="field_wrapper">
                <label htmlFor="fromDate">From Date:</label>
                <input type="date" name="fromDate" value={fromDate} onChange={(e) => (setFromDate(e.target.value), setUptoDate(getCurrentDate()))} max={getCurrentDate()} id="" />
              </div>

              <div className="field_wrapper">
                <label htmlFor="uptoDate">Upto Date:</label>
                <input type="date" name="uptoDate" value={uptoDate} onChange={e => setUptoDate(e.target.value)} disabled={fromDate == ''} min={fromDate} max={getCurrentDate()} id="" />
              </div>

              <div className="filter_button" onClick={() => filterFun()}> <span><FaFilter size={18} fill="#fff" /></span><span>Search</span></div>

            </form>

            <form className="filter_container">

              <div>
                <p><label htmlFor="fromDate">Search By IMEI</label></p>
                <input type="text" name="imei" value={searchIMEI} onChange={(e) => setSearchIMEI(e.target.value)} id="" />
              </div>

              <div className="filter_button" onClick={() => navigate(`/deviceInventory/details/${searchIMEI}`)}> <span>Search IMEI</span></div>

            </form>
            </div>
          {
            status && <ListTableActivatedDeviceData
              api={`${BaseURL}/DeviceInventory/getalldevicelistv2?eid=${eid}&fromDt=${fromDate}&toDt=${uptoDate}&status=${activationStatus}&cttatus=${ctApprovalStatus}&locate=${locateStatus}&`} 
              method="GET"
              columns={[...column,               
              {
                Header: "Health Check",
                Cell: ({ row }) => <>
                  <button onClick={() => openHealthPacketView(row?.original)} style={{ backgroundColor: 'rgba(0,100,0, 0.8)', outline: 'none', fontSize: '12px', color: 'white', border: '1px solid rgba(0,122,0, 0.9)', padding: '3px 7px', cursor: 'pointer' }}>Health Packet</button>
                </>
              },
              {
                Header: "Raw Packets",
                accessor: 'rawData',
                Cell: ({row}) => <>
                <button style={{ cursor: 'pointer', backgroundColor: 'orange', border: '1px solid orange', color: 'white', padding: '3px 8px', fontSize: '12px' }} onClick={() => openRawCollection(row?.original)}>Raw Packets</button>
              </>
              },
            ]}
              changeData={changeData}
            />
          }

        </>
      }
    </>
  );
};

