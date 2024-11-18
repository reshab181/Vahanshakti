import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router';
import ListTableConnect from "../../components/Common/ListTableBP/ListTableConnect";
import { BaseURL } from "../../constants/baseURL";
import { BiDetail } from "react-icons/bi";
import { LoadingWidget } from '../../components/loading';
import { getAllDeviceListByEID } from '../../apis/deviceInventory';
// import { BaseURL } from "../../constants/baseURL";

const WhiteListedIMEI = () => {
  const [deviceList, setDeviceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(-1)
  const [changeData, setChangeData] = useState(0)
  const navigate = useNavigate()
  let user = sessionStorage.getItem("userType");
  let userType = JSON.parse(user);
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


  const column = [
    {
      Header: "Device Serial No",
      accessor: "deviceSerialNo",
      Cell: ({ cell }) => <>
        <div onClick={() => navigate(`/deviceInventory/details/${cell?.row?.original?.imeiNo}`, { state: cell?.row?.original })} className="" style={{ display: 'flex', gap: '5px', alignContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
          <span style={{color: '#42a4f5'}}>{cell?.row?.original?.deviceSerialNo}</span>
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
    {
      Header: "INTOUCH Entity ID",
      accessor: "intuchEntityId",
      Cell: ({ cell }) => (cell?.row?.original?.intuchEntityId || "N/A")
    },
    {
      Header: "Action",
      Cell: ({ cell }) => <>
        {
          cell?.row?.original?.status == 0 ?
            <button style={{ border: '1px solid red', padding: '5px 7px', fontSize: '12px', fontWeight: '600', backgroundColor: 'rgba(255, 0, 0, 0.8)', color: 'white', cursor: 'pointer' }} onClick={() => navigate('/deviceInventorys/activateDevice', { state: cell?.row?.original })}>Activate</button>
            :
            <span style={{ border: '1px solid green', padding: '5px 7px', fontSize: '12px', fontWeight: '600', backgroundColor: 'green', color: 'white' }}>Activated</span>
        }
      </>
    }
  ]

  return (
    <>

    <div className="alarm_header">
      <div className='heading_container'>
        White Listed IMEI
      </div>
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
              api={`${BaseURL}/DeviceInventory/getalldevicelistv2?eid=${eid}&roletype=${userType}&status=${-1}&`}
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

export default WhiteListedIMEI
