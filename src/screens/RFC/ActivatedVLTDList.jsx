
import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import ListTableConnect from "../../components/Common/ListTableBP/ListTableConnect";
import { BaseURL } from "../../constants/baseURL";

import { getBeforeDate, getCurrentDate } from '../../components/Common/PowerUpFunctions';
import Swal from 'sweetalert2';
import { FaFilter } from 'react-icons/fa6';
import { LoadingWidget } from '../../components/loading';
import { getAllDeviceListByEID } from '../../apis/deviceInventory';
// import { BaseURL } from "../../constants/baseURL";

const ActivatedVLTDLIST = () => {
  const [deviceList, setDeviceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(-1)
  const [changeData, setChangeData] = useState(0)
  const [fromDate, setFromDate] = useState(getBeforeDate(90))
  const [uptoDate, setUptoDate] = useState(getCurrentDate())
  const [searchIMEI, setSearchIMEI] = useState("")

  const navigate = useNavigate()
  let userType = sessionStorage.getItem("userType");
  let eid = sessionStorage.getItem("entityId");

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      setLoading(true);
      let result;
      // if (userType === "MNF" || userType === "DST") {
      result = await getAllDeviceListByEID(eid);
      // }
      setDeviceList(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setStatus(parseInt(value))
    setChangeData(changeData + 1)
  }

  // To Filter data
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

    setChangeData(changeData + 1)

  }


  const column = [
    {
      Header: "Device Serial No",
      accessor: "deviceSerialNo",
      Cell: ({ cell }) => <>
        <div onClick={() => navigate(`/deviceInventory/details/${cell?.row?.original?.imeiNo}`, { state: cell?.row?.original })} className="" style={{ display: 'flex', gap: '5px', alignContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
          <span style={{ color: '#42a4f5' }}>{cell?.row?.original?.deviceSerialNo}</span>
        </div>
      </>
    },
    {
      Header: "IMEI No",
      accessor: "imeiNo",
      Cell: ({ cell }) => (cell?.row?.original?.imeiNo || "N/A")
    },
    {
      Header: "ICCID Number",
      accessor: "iccidNumber",
      Cell: ({ cell }) => (cell?.row?.original?.iccidNumber || "N/A")
    },
    {
      Header: "VLTD Model Code",
      accessor: "vltdModelCode",
      Cell: ({ cell }) => (cell?.row?.original?.vltdModelCode || "N/A")
    },
    {
      Header: "Vehicle Registration Number",
      accessor: "vehicleRegistrationNumber",
      Cell: ({ cell }) => (cell?.row?.original?.vehicleRegistrationNumber || "N/A")
    },
    // {
    //   Header: "INTOUCH Entity ID",
    //   accessor: "intuchEntityId",
    //   Cell: ({ cell }) => (cell?.row?.original?.intuchEntityId || "N/A")
    // },
    {
      Header: "Action",
      Cell: ({ cell }) => <>
        {
          cell?.row?.original?.status == 0 ?
            <button style={{ border: '1px solid red', padding: '5px 7px', fontSize: '12px', fontWeight: '600', backgroundColor: 'rgba(255, 0, 0, 0.8)', color: 'white', cursor: 'pointer' }} onClick={() => navigate('/deviceInventorys/activateDevice', { state: cell?.row?.original })}>Activate</button>
            :
            <span style={{ border: '1px solid #1E2961', padding: '5px 7px', fontSize: '12px', fontWeight: '600', backgroundColor: '#2C3D8F', color: 'white', cursor: 'pointer' }} onClick={() => navigate(`/rfc/printVltdList/${cell?.row?.original?.imeiNo}`)}>Print</span>
        }
      </>
    }
  ]

  return (
    <>

      <div className="alarm_header">
        <div className='heading_container'>
          Activated VLTD List
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

      {loading ? (
        <div className="shimmer-container">
        {/* Render shimmer rows */}
        {Array.from({ length: 10 }).map((_, rowIndex) => (
          <div key={rowIndex} className="shimmer-row">
            {Array.from({ length: 6 }).map((_, cellIndex) => (
              <div key={cellIndex} className="shimmer-cell"></div>
            ))}
          </div>
        ))}
      </div>
      ) :
        <>
          {
            <ListTableConnect
              api={`${BaseURL}/DeviceInventory/getalldevicelistv2?eid=${eid}&fromDt=${fromDate}&toDt=${uptoDate}&roletype=${userType}&status=${1}&`}
              method="GET"
              columns={column}
              changeData={changeData}
            />
          }
        </>
      }
    </>
  )
}

export default ActivatedVLTDLIST

