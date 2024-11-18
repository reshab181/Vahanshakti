import React, { useState, useEffect } from "react";
import { assigntodst, imeiToList } from "../../../apis/deviceInventory";
import ListTableConnect from "../../../components/Common/ListTableBP/ListTableConnect";
import { BaseURL } from "../../../constants/baseURL";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaFilter } from 'react-icons/fa6'
import { getAllDistributorMNF } from "../../../apis/distributor";
import { RotatingLines } from "react-loader-spinner";
import Swal from "sweetalert2";
import { MdInfoOutline } from "react-icons/md";
import { ImCheckmark, ImCross } from "react-icons/im";
import { checkFile, getBeforeDate, getCurrentDate } from "../../../components/Common/PowerUpFunctions";
import '../style.css'
import readXlsxFile from "read-excel-file";
import ListTable from "../../../components/Common/Listtable/ListTable";
import { LoadingWidget } from "../../../components/loading";
import { useTranslation } from "react-i18next";

export const DeviceInventoryListMNFDST = () => {

  const {t} = useTranslation()

  let eid = sessionStorage.getItem("entityId");

  const [status, setStatus] = useState(0) // url param status
  const [changeData, setChangeData] = useState(0) // change event data
  const [distributorList, setDistributorList] = useState([]) // store distributor list
  const [toggle, setToggle] = useState(-1) // toggle button to action
  const [entityId, setEntityId] = useState(-1) // store entity id
  const [loader, setLoader] = useState(false) // loader status
  const [bulkStatus, setBulkStatus] = useState(false) // bulk status
  const [bulkData, setBulkData] = useState([]) // store bulk data
  const [dataList, setDataList] = useState([]) // store response data
  const [fromDate, setFromDate] = useState(getBeforeDate(90)) // initial from Date (before 3 days)
  const [uptoDate, setUptoDate] = useState(getCurrentDate()) // initial upto date
  const [excelData, setExcelData] = useState({ imeilist: [] }) // initial excel data
  const [excelDataList, setExcelDataList] = useState(null) // to store data from excel
  const [excelView, setExcelView] = useState(false) // to toggle excel data view
  const [excelLoader, setExcelLoader] = useState(false) // excel process loader
  const [searchIMEI, setSearchIMEI] = useState("")

  const navigate = useNavigate() 

  // constant variables
  let userType = sessionStorage.getItem("userType")
  let designation = sessionStorage.getItem("designation")
  

  // fetch distributor list
  const fetchDistributorByIdList = async () => {
    let resp = await getAllDistributorMNF(eid)
    setDistributorList(resp)
  }

  // calling function on page render
  useEffect(() => {
    userType === "MNF" && fetchDistributorByIdList()
  }, []);

  // to handle url param change
  const handleChange = (e) => {
    const value = e.target.value;
    console.log(value);
    setStatus(parseInt(value))
    setChangeData(changeData + 1)
  }

  // Function for api to assign
  const assingFun = async (obj, type = '') => {

    let body;

    // Validation and making request body
    switch (type) {

      case 'bulk': {

        if (bulkData?.length == 0) {
          Swal.fire({
            icon: "error",
            title: "",
            text: `No inventory selected for Assignment`,
          });
          return;
        }

        body = bulkData?.map((item) => {
          return { ...item, entityId: parseInt(entityId) };
        });

      } break;

      default: {
        body = [{
          id: String(obj?.id),
          imeiNo: obj?.imeiNo,
          entityid: parseInt(entityId)
        }]
      }

    }

    console.log('request body: ', body)

    setLoader(true)

    const apiHitting = await assigntodst(body)

    if (apiHitting?.status == true) {

      setLoader(false)

      Swal.fire({
        icon: "success",
        title: "Action Taken Successfully",
        text: apiHitting?.message,
      });

      setToggle(-1)

      if (excelView) {
        takeActionExcel()
      } else {
        setChangeData(changeData + 1)
      }

    } else {
      setLoader(false)
    }

  }

  // Bulk assing button status handle
  const handleBulkStatus = (status) => {
    setBulkStatus(status)
    if (status) {
      setToggle(-1)
      setEntityId(-1)

      let tempData = dataList?.filter(item => (item?.ctStatus == 1 && item?.distEntityCode == null))?.map((elem, index) => {
        return {
          id: String(elem?.id),
          imeiNo: elem?.imeiNo,
        }
      })

      setBulkData(tempData)

    } else {
      setBulkData([])
    }
  }

  // To handle change event in table checkbox
  const handleBulkChange = (e) => {
    const checkStatus = e.target.checked;
    const value = e.target.value;


    switch (checkStatus) {

      case true: {
        let tempData = dataList?.filter(item => (item?.ctStatus == 1 && item?.distEntityCode == null && item?.id == value))?.map((elem, index) => {
          return {
            id: String(elem?.id),
            imeiNo: elem?.imeiNo,
          }
        })
        setBulkData(prev => [...prev, tempData[0]])
      } break;

      case false: {
        let tempData = bulkData?.filter(item => item?.id != value)?.map((elem, index) => {
          return {
            id: String(elem?.id),
            imeiNo: elem?.imeiNo,
          }
        })
        setBulkData(tempData)
      } break;

    }
  }

  // to keep checkbox checked or not
  const checkValueStatus = (value) => {
    let status = bulkData?.length > 0 && bulkData?.some(item => item?.id == value)
    return status;
  }

  // To Excel file handle change and storing excel data
  const onExcelAction = async (e) => {

    try {

      const file = e.target.files[0];

      if (checkFile(file, 'excel') == false) {
        return;
      }

      const rows = await readXlsxFile(file);

      console.log("Rows read from file:", rows);

      if (rows.length === 0 || rows[0].length === 0) {
        Swal.fire({
          icon: "error",
          title: "",
          text: "Empty file or invalid format",
        })
        return;
      }

      if (rows[0].length > 1) {
        Swal.fire({
          icon: "error",
          title: "",
          text: "There must be only one column i.e. 'imei'",
        })
        return;
      }

      if (String(rows[0][0])?.toLowerCase() != 'imei') {
        Swal.fire({
          icon: "error",
          title: "",
          text: "Header must be 'imei'",
        })
        return;
      }

      let tempData = rows.slice(1,)?.flat()?.map(item => String(item))
      setExcelData({ imeilist: tempData })

      console.log('excel data: ', tempData)
    } catch (error) {
      console.error("Error processing file:", error.message);
    }
  };

  // Fetching list from excel
  const takeActionExcel = async () => {

    if (excelData?.imeilist?.length <= 0) {
      Swal.fire({
        icon: "error",
        title: "",
        text: "Select Excel File",
      })
      return;
    }

    setExcelLoader(true)

    const response = await imeiToList(excelData)
    console.log('excel response: ', response)

    if (response?.status) {
      setExcelDataList(response?.result ?? [])
      setDataList(response?.result ?? [])
      setExcelView(response?.status)
    }

    setExcelLoader(false)
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
      Header: '#',
      Cell: ({ cell }) => <>
        {bulkStatus ?
          <>
            {
              cell?.row?.original?.distEntityCode ?
                <><FaCheck fill="#0f5" size={20} /></>
                :

                cell?.row?.original?.ctStatus == 1 ?

                  <div className="field_wrapper field_wrapper_row">
                    <div className="radio_selection">
                      <input checked={checkValueStatus(cell?.row?.original?.id)} onChange={(e) => handleBulkChange(e)} value={cell?.row?.original?.id} style={{ height: '1rem', width: '1rem', cursor: 'pointer' }} type="checkbox" name="greenType" id="Acceleration" />
                    </div>
                  </div>
                  :
                  <attr title={`${cell?.row?.original?.ctStatus == 2 ? 'Rejected' : 'Pending'} on Control Tower`}><MdInfoOutline fill="#00f" size={20} /></attr>
            }

          </>
          :
          <>
            {cell?.row?.index + 1}
          </>
        }

      </>
    },
    {
      Header: t('deviceList.ImeiNoText'),
      accessor: "imeiNo",
      Cell: ({ cell }) => <>
      <div onClick={() => navigate(`/deviceInventory/details/${cell?.row?.original?.imeiNo}`)} className="" style={{ display: 'flex', gap: '5px', alignContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
        <span style={{ color: '#42a4f5' }}>{cell?.row?.original?.imeiNo}</span>
      </div>
    </>
    },
    {
      Header: t('deviceList.DeviceSerialNoText'),
      accessor: "deviceSerialNo",
      Cell: ({ cell }) => (cell?.row?.original?.deviceSerialNo)
    },
    {
      Header: t('deviceList.ManufacturerNameText'),
      accessor: "mnfName",
      Cell: ({ cell }) => (cell?.row?.original?.mnfName || "N/A")
    },
    {
      Header: t('deviceList.DistributorNameText'),
      accessor: "distName",
      Cell: ({ cell }) => (cell?.row?.original?.distName || "N/A")
    },
    {
      Header: t('deviceList.IccidNumberText'),
      accessor: "iccidNumber",
      Cell: ({ cell }) => (cell?.row?.original?.iccidNumber || "N/A")
    },
    {
      Header: t('deviceList.VltdModelCodeText'),
      accessor: "vltdModelCode",
      Cell: ({ cell }) => (cell?.row?.original?.vltdModelCode || "N/A")
    },
    
    {
      Header: t('basicWord.ActionText'),
      Cell: ({ cell }) => <>

        {/* For RFC */}
        {console.log(cell, "rfcCellButton")}
        {cell?.row?.original?.ctStatus == 1 && userType == 'RFC' && cell?.row?.original?.rfcId && <>
          {
            cell?.row?.original?.status == 0 ?
              <p>Not Activated</p>
              :
              <button onClick={() => navigate(`/deviceInventory/printVltdList/${cell?.row?.original?.imeiNo}`)} style={{ backgroundColor: 'rgba(0,100,0, 0.8)', outline: 'none', fontSize: '12px', color: 'white', border: '1px solid rgba(0,122,0, 0.9)', padding: '3px 7px', cursor: 'pointer' }}>Certificate</button>
          }
        </>}

        {/* For DST */}
        {cell?.row?.original?.ctStatus == 1 && userType == 'DST'  && <>
          {
           !cell?.row?.original?.rfcId ? "not assigned" : cell?.row?.original?.rfcId &&  cell?.row?.original?.status  == 0 ?
              "assigned"
              :
              <button onClick={() => navigate(`/deviceInventory/printVltdList/${cell?.row?.original?.imeiNo}`)} style={{ backgroundColor: 'rgba(0,100,0, 0.8)', outline: 'none', fontSize: '12px', color: 'white', border: '1px solid rgba(0,122,0, 0.9)', padding: '3px 7px', cursor: 'pointer' }}>Certificate</button>
          }
        </>}

        {/* For MNF */}
        {
          cell?.row?.original?.ctStatus == 1 && userType == 'MNF' && !cell?.row?.original?.distEntityCode && toggle != cell?.row?.original?.id &&
          <button disabled={bulkStatus} style={{ border: '1px solid red', padding: '5px 7px', fontSize: '12px', fontWeight: '600', backgroundColor: 'rgba(255, 0, 0, 0.8)', color: 'white', cursor: 'pointer' }} onClick={() => (setToggle(cell?.row?.original?.id), setEntityId(-1))}>Assign</button>
        }
        {
          cell?.row?.original?.ctStatus == 1 && userType == 'MNF' && cell?.row?.original?.distEntityCode &&
          <span style={{ padding: '5px 7px', fontSize: '14px', fontWeight: '700', color: 'green' }}>Assigned</span>
        }

        {/* Action Form For MNF */}
        {
          cell?.row?.original?.ctStatus == 1 && userType == 'MNF' && !bulkStatus && toggle == cell?.row?.original?.id &&
          <>
            <div className="cell_action">
              <select name="" id="" disabled={loader} onChange={(e) => setEntityId(e.target.value)} value={entityId}>
                <option value={-1} disabled>Select</option>
                {
                  Array.isArray(distributorList) &&
                  distributorList?.map((elem, index) =>
                    <option key={index} value={elem?.id}>{elem?.entityName}</option>
                  )
                }
              </select>

              {!loader ? <>
                {entityId != -1 && <attr title="Confirm" className="cell_check" onClick={() => assingFun(cell?.row?.original)}><ImCheckmark size={18} /></attr>}
                <att title="Cancel" className="cell_cross" onClick={() => setToggle(-1)}><ImCross /></att>
              </>
                :
                <>
                  <div className="loader-spin">
                    <RotatingLines
                      visible={true}
                      height="20"
                      width="20"
                      color="#000"
                      strokeWidth="5"
                      strokeColor="grey"
                      animationDuration="0.75"
                      ariaLabel="rotating-lines-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </div>
                </>}
            </div>
          </>
        }


        {/* Else Status */}
        {
          cell?.row?.original?.ctStatus == 0 && <span style={{ padding: '5px 7px', fontSize: '14px', fontWeight: '700' }}>Pending</span>
        }

        {
          (userType == 'SUA' || userType == "SBU") && cell?.row?.original?.ctStatus == 1 && <span style={{ padding: '5px 7px', fontSize: '14px', fontWeight: '700', color: 'green' }}>Approved</span>
        }

        {
          cell?.row?.original?.ctStatus == 2 && <span style={{ padding: '5px 7px', fontSize: '14px', fontWeight: '700', color: 'red' }}>Rejected</span>
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
              DEVICE INVENTORY LIST <i style={{ fontWeight: '600', fontSize: '14px' }}>{excelView && "(Showing Excel Data List)"}</i>
            </div>

            {/* Left Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
              {userType == 'MNF' && 
                <div className="bulk_assign_button">
                  {!bulkStatus ?
                    <button className='form_button button_reset' onClick={() => handleBulkStatus(true)}>
                      Bulk Assign
                    </button>
                    :
                    <>
                      <div className="cell_action">
                        <select name="" id="" disabled={loader} onChange={(e) => setEntityId(e.target.value)} value={entityId}>
                          <option value={-1} disabled>Select</option>
                          {
                            Array.isArray(distributorList) &&
                            distributorList?.map((elem, index) =>
                              <option key={index} value={elem?.id}>{elem?.entityName}</option>
                            )
                          }
                        </select>

                        {!loader ? <>
                          {entityId != -1 && <attr title="Confirm" className="cell_check" onClick={() => assingFun(null, 'bulk')}><ImCheckmark size={18} /></attr>}
                          <attr title="Cancel" className="cell_cross" onClick={() => handleBulkStatus(false)}><ImCross /></attr>
                        </>
                          :
                          <>
                            {/* Loader */}
                            <div className="loader-spin">
                              <RotatingLines
                                visible={true}
                                height="20"
                                width="20"
                                color="#000"
                                strokeWidth="5"
                                strokeColor="grey"
                                animationDuration="0.75"
                                ariaLabel="rotating-lines-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                              />
                            </div>
                          </>}
                      </div>
                    </>}
                  </div>}
                  <select className="alarm_filter" name="" id="" onChange={handleChange}>
                    <option value="0">Not {userType == "MNF" ? 'Assigned' : 'Activated'}</option>
                    <option value="1">{userType == "MNF" ? 'Assigned' : 'Activated'}</option>
                    <option value="-1">All</option>
                  </select>
            </div>
          </div>

          {/* Container to fetch excel file data */}
          {['MNF', 'DST'].includes(userType) &&
            <>
              {
                !excelView ?
                  <div className="bulk_assign_button" style={{ paddingRight: '10px', margin: '5px 10px' }}>
                    <input type="file" name="" accept=".xlsx,.xls" onChange={e => onExcelAction(e)} id="" style={{ backgroundColor: 'white' }} />
                    <button className="form_button button_submit" onClick={() => takeActionExcel()} style={{ padding: '7px 10px', marginLeft: '5px' }}>Get List By Excel</button>
                  </div>
                  :
                  <div className="bulk_assign_button" style={{ paddingRight: '10px', margin: '5px 10px' }}>
                    <button className="form_button button_cancel" onClick={() => (setExcelView(false), setExcelData({ imeilist: [] }))} style={{ padding: '7px 10px', marginLeft: '5px', color: 'white' }}>Cancel List By Excel</button>
                  </div>
              }
            </>
          }

          {/* Container to filter data list */}
          {!excelLoader && !excelView &&
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
            </div>}

          {
            excelLoader && <div className="shimmer-container">
            {/* Render shimmer rows */}
            {Array.from({ length: 10 }).map((_, rowIndex) => (
              <div key={rowIndex} className="shimmer-row">
                {Array.from({ length: 6 }).map((_, cellIndex) => (
                  <div key={cellIndex} className="shimmer-cell"></div>
                ))}
              </div>
            ))}
          </div>
          }
          {
            !excelLoader && !excelView ?
              <>
                {
                  (userType === "RFC" && designation.toLowerCase() !== "admin") &&
                  <ListTableConnect
                    api={`${BaseURL}/DeviceInventory/GetDeviceAllListRfc?fromDt=${fromDate}&toDt=${uptoDate}&status=${status}&rfcassign=1&`}
                    method="GET"
                    columns={column}
                    changeData={changeData}
                    getData={(data) => setDataList(data?.devicelist)}
                  />
                }
                
                {
                  (userType === "RFC" && designation.toLowerCase() === "admin") &&
                  <ListTableConnect
                    api={`${BaseURL}/DeviceInventory/getalldevicelistv2?eid=${eid}&fromDt=${fromDate}&toDt=${uptoDate}&roletype=${userType}&locate=${status}&cttatus=${1}&`}
                    method="GET"
                    columns={column}
                    changeData={changeData}
                    getData={(data) => setDataList(data?.devicelist)}
                  />
                }

{
                  (userType === "DST" && designation.toLowerCase() !== "admin") &&
                  <ListTableConnect
                    api={`${BaseURL}/DeviceInventory/GetDeviceAllListassignDst?fromDt=${fromDate}&toDt=${uptoDate}&status=${status}&assign=0&`}
                    method="GET"
                    columns={column}
                    changeData={changeData}
                    getData={(data) => setDataList(data?.devicelist)}
                  />
                }
                
                {
                  (userType === "DST" && designation.toLowerCase() === "admin") &&
                  <ListTableConnect
                    api={`${BaseURL}/DeviceInventory/getalldevicelistv2?eid=${eid}&fromDt=${fromDate}&toDt=${uptoDate}&roletype=${userType}&locate=${status}&cttatus=${1}&`}
                    method="GET"
                    columns={column}
                    changeData={changeData}
                    getData={(data) => setDataList(data?.devicelist)}
                  />
                }

                {
                  userType === "MNF" &&
                  <ListTableConnect
                    api={`${BaseURL}/DeviceInventory/getalldevicelistv2?eid=${eid}&fromDt=${fromDate}&toDt=${uptoDate}&roletype=${userType}&locate=${status}&cttatus=${1}&`}
                    method="GET"
                    columns={column}
                    changeData={changeData}
                    getData={(data) => setDataList(data?.devicelist)}
                  />
                }

              </>
              :
              
              <>{Array.isArray(excelDataList) && <ListTable dataList={excelDataList} columns={column} />}</>
          }
    </>
  );
};

