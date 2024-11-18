import React, { useState, useEffect } from "react";
import ListTableConnect from "../../components/Common/ListTableBP/ListTableConnect";
import { BaseURL } from "../../constants/baseURL";
import { useNavigate } from "react-router-dom";
import './style.css'
import { FaFilter } from 'react-icons/fa6'
import { getAllManufacturer } from "../../apis/manufacture";
import Swal from "sweetalert2";
import { getBeforeDate, getCurrentDate } from "../../components/Common/PowerUpFunctions";

export const CTDeviceInventoryApproved = () => {

  const [changeData, setChangeData] = useState(0) // change event data
  const [mnfList, setMnfList] = useState([]) // store distributor list
  const [toggle, setToggle] = useState(-1) // toggle button to action
  const [dataList, setDataList] = useState([]) // store response data
  const [mnfId, setMnfId] = useState(-1) // initial mnf id
  const [fromDate, setFromDate] = useState(getBeforeDate(0, 0, 2)) // initial from Date (before 3 days)
  const [uptoDate, setUptoDate] = useState(getCurrentDate()) // initial upto date
  const [searchIMEI, setSearchIMEI] = useState('')
  const navigate = useNavigate() // navigate constant

  // constant variables
  let userType = sessionStorage.getItem("userType");

  // fetch Manufacturer list
  const fetchAllManufacturer = async () => {
    let resp = await getAllManufacturer()
    setMnfList(resp)
  }

  // calling function on page render
  useEffect(() => {
    fetchAllManufacturer()
  }, []);

  // to handle url param change
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case 'mnfList': {
        setMnfId(value)
        setChangeData(changeData + 1)
      } break;

      case 'filter': {
        setChangeData(changeData + 1)
      }
    }

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

  // Table Column
  const column = [
    {
      Header: '#',
      Cell: ({ cell }) => <>{cell?.row?.index + 1}</>
    },
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
      Header: "Manufacturer Name",
      accessor: "mnfName",
      Cell: ({ cell }) => (cell?.row?.original?.mnfName || "N/A")
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
    // {
    //   Header: "INTOUCH Entity ID",
    //   accessor: "intuchEntityId",
    //   Cell: ({ cell }) => (cell?.row?.original?.intuchEntityId || "N/A")
    // },
    {
      Header: "Action",
      Cell: ({ cell }) => <>

        {
          cell?.row?.original?.ctStatus == 0 && toggle != cell?.row?.original?.id &&
          <button style={{ border: '1px solid blue', padding: '5px 7px', fontSize: '12px', fontWeight: '600', backgroundColor: 'rgb(33,98,178)', color: 'white', cursor: 'pointer' }} onClick={() => setToggle(cell?.row?.original?.id)}>Action</button>
        }
        {
          cell?.row?.original?.ctStatus == 1 &&
          <span style={{ padding: '5px 7px', fontSize: '14px', fontWeight: '700', color: 'green' }}>Approved</span>
        }
        {
          cell?.row?.original?.ctStatus == 2 &&
          <span style={{ padding: '5px 7px', fontSize: '14px', fontWeight: '700', color: 'red' }}>Rejected</span>
        }

        

      </>,
      width: '10rem'
    }
  ]

  return (
    <>

      {/* Top Container */}
      <div className="alarm_header">

        {/* Heading */}
        <div className='heading_container'>
          Device Inventory Control Tower
        </div>

        {/* Left Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '5px' }}>
          
          <select className="alarm_filter" name="mnfList" id="" onChange={handleChange}>
            <option value="-1">All Manufacturer</option>
            {
              Array.isArray(mnfList) &&
              mnfList?.map((elem, index) =>
                <option key={index} value={elem?.id}>{elem?.entityName}</option>
              )
            }
          </select>
        </div>
      </div>

            {/* Container to filter data list */}
      
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

      {/* Tables */}
      
        <ListTableConnect
          api={`${BaseURL}/DeviceInventory/getalldevicelistv2?eid=${mnfId}&fromDt=${fromDate}&toDt=${uptoDate}&roletype=${userType}&status=-1&cttatus=${1}&`}
          method="GET"
          columns={column}
          changeData={changeData}
          getData={(data) => setDataList(data?.devicelist)}
        />
      

    </>
  );
};

