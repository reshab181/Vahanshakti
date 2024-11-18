import React, { useState, useEffect } from "react";
import { assigntorfc, imeiToList } from "../../apis/deviceInventory";
import ListTableConnect from "../../components/Common/ListTableBP/ListTableConnect";
import { BaseURL } from "../../constants/baseURL";
import { useNavigate } from "react-router-dom";
import './style.css'
import { FaCheck, FaFilter } from 'react-icons/fa6'
import { getManufacturerMappedToDST, getRFCMappedToMNF, getUsersInDST } from "../../apis/distributor";
import { RotatingLines } from "react-loader-spinner";
import Swal from "sweetalert2";
import { ImCheckmark, ImCross } from "react-icons/im";
import { getBeforeDate, getCurrentDate } from "../../components/Common/PowerUpFunctions";
import readXlsxFile from "read-excel-file";
import ListTable from "../../components/Common/Listtable/ListTable";
import { LoadingWidget } from "../../components/loading";

export const DeviceInventoryListRfcAssign = () => {

  const [status, setStatus] = useState(0) // url param status
  const [changeData, setChangeData] = useState(0) // change event data
  const [toggle, setToggle] = useState(-1) // toggle button to action
  const [entityId, setEntityId] = useState(-1) // store entity id
  const [loader, setLoader] = useState(false) // loader status
  const [bulkStatus, setBulkStatus] = useState(false) // bulk status
  const [bulkData, setBulkData] = useState([]) // store bulk data
  const [dataList, setDataList] = useState([]) // store response data
  const [rfcList, setRfcList] = useState([]) // To store RFC user list
  const [fromDate, setFromDate] = useState(getBeforeDate(90)) // initial from Date (before 3 days)
  const [uptoDate, setUptoDate] = useState(getCurrentDate()) // initial upto date
  const [excelData, setExcelData] = useState({ imeilist: [] }) // initial excel data
  const [excelDataList, setExcelDataList] = useState(null) // to store data from excel
  const [excelView, setExcelView] = useState(false) // to toggle excel data view
  const [excelLoader, setExcelLoader] = useState(false) // excel process loader
  const [searchIMEI, setSearchIMEI] = useState("")
  const [manufacturerSelection, setManufacturerSelection] = useState([])
  const [manufacturerFiltered, setManufacturerFiltered] = useState(null)

  const navigate = useNavigate() // navigate constant

  // constant variables
  let userType = sessionStorage.getItem("userType");
  let eid = sessionStorage.getItem("entityId");


// To Fetch Manufacturers Mapped to this distributor
const fetchManufacturersList = async () => {
  const response = await getManufacturerMappedToDST()
  if(response?.status){
    setManufacturerSelection(response?.result)
  }
}

// calling function on page render
useEffect(() => {
  fetchManufacturersList()
}, []);


// To Fetch Manufacturers Mapped to this distributor
const fetchRFCMappedList = async () => {
  const response = await getRFCMappedToMNF(manufacturerFiltered)
  console.log(response, "fetchRFCMappedList")

  if(response?.status){
    setRfcList(response?.result)
  }
}

// calling function on page render
useEffect(() => {
  if(manufacturerFiltered && fetchRFCMappedList !== ""){
    fetchRFCMappedList()
  }
  
}, [manufacturerFiltered]);



  // to handle url param change
  const handleChange = (e) => {
    const value = e.target.value;
    setStatus(parseInt(value))
    setChangeData(changeData + 1)
  }

  // Function for api to assign
  const assingFun = async (obj, type = '') => {

    let body;

    switch (type) {

      case 'bulk': {

        if (bulkData?.length == 0) {
          Swal.fire({
            icon: "error",
            title: "",
            text: `No any inventory selected to Assign`,
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
    // return;
    setLoader(true)

    const apiHitting = await assigntorfc(body)

    if (apiHitting?.status == true) {

      setLoader(false)

      Swal.fire({
        icon: "success",
        title: "Action Taken Successfully",
        text: apiHitting?.message,
      });

      setToggle(-1)

      setChangeData(changeData + 1)

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

      let tempData = dataList?.filter(item => (item?.ctStatus == 1 && item?.rfcId == null))?.map((elem) => {
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
        let tempData = dataList?.filter(item => (item?.ctStatus == 1 && item?.rfcId == null && item?.id == value))?.map((elem) => {
          return {
            id: String(elem?.id),
            imeiNo: elem?.imeiNo,
          }
        })
        setBulkData(prev => [...prev, tempData[0]])
      } break;

      case false: {
        let tempData = bulkData?.filter(item => item?.id != value)?.map((elem) => {
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

      // if (checkFile(file, 'excel') == false) {
      //   return;
      // }

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

  // Table Column
  const column = [
    {
      Header: '#',
      Cell: ({ cell }) => <>
        {bulkStatus ?
          <>
            {
              cell?.row?.original?.rfcId ?
                <><FaCheck fill="#0f5" size={20} /></>
                :
                <div className="field_wrapper field_wrapper_row">
                  <div className="radio_selection">
                    <input checked={checkValueStatus(cell?.row?.original?.id)} onChange={(e) => handleBulkChange(e)} value={cell?.row?.original?.id} style={{ height: '1rem', width: '1rem', cursor: 'pointer' }} type="checkbox" name="greenType" id="Acceleration" />
                  </div>
                </div>
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
    // {
    //   Header: "Entity ID",
    //   accessor: "intuchEntityId",
    //   Cell: ({ cell }) => (cell?.row?.original?.intuchEntityId || "N/A")
    // },
    {
      Header: "Action",
      Cell: ({ cell }) => <>

        {/* For DST */}
        {cell?.row?.original?.ctStatus == 1 && cell?.row?.original?.distEntityCode && <>
          {
            cell?.row?.original?.rfcId ?
              <span style={{ padding: '5px 7px', fontSize: '14px', fontWeight: '700', color: 'green' }}>Assigned</span>
              :
              <>

                {
                  cell?.row?.original?.ctStatus == 1 && cell?.row?.original?.distEntityCode && toggle != cell?.row?.original?.id &&
                  <button disabled={bulkStatus} style={{ border: '1px solid red', padding: '5px 7px', fontSize: '12px', fontWeight: '600', backgroundColor: 'rgba(255, 0, 0, 0.8)', color: 'white', cursor: 'pointer' }} onClick={() => (setToggle(cell?.row?.original?.id), setEntityId(-1))}>Assign</button>
                }

                {
                  !bulkStatus && toggle == cell?.row?.original?.id &&
                  <>
                    <div className="cell_action">
                      <select name="" id="" disabled={loader} onChange={(e) => setEntityId(e.target.value)} value={entityId}>
                        <option value="">Select</option>
                        {
                          Array.isArray(rfcList) &&
                          rfcList?.map((elem, index) =>
                            <option key={elem.id} value={elem.id}>{elem?.entity_name}</option>
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
              </>
          }
        </>}

      </>,
      width: '10rem'
    }
  ]

  console.log(manufacturerFiltered, "setManufacturerFiltered")

  return (
    <>

      {/* Top Container */}
      <div className="alarm_header">

        {/* Heading */}
        <div className='heading_container'>
          RFC Assign Inventory List <i style={{ fontWeight: '600', fontSize: '14px' }}>{excelView && "(Showing Excel Data List)"}</i>
        </div>

        {/* Left Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
          {
            manufacturerSelection.length > 0 && <select onChange={(e)=>{
                                                            setManufacturerFiltered(e.target.value)
                                                            setChangeData(prev=>prev+1)}}>
              <option value="" >Select</option>
                    {
                      Array.isArray(manufacturerSelection) &&
                      manufacturerSelection?.map((elem, index) =>
                        <option key={elem.id} value={elem.id}>{elem.entity_name}</option>
                      )
                    }
            </select>
          }
          {userType == 'DST' && <div className="bulk_assign_button">
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
                      Array.isArray(rfcList) &&
                      rfcList?.map((elem, index) =>
                        <option key={elem.id} value={elem.id}>{elem?.entity_name}</option>
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
          <select className="alarm_filter" name="" id="" onChange={handleChange} value={status}>
            <option value="-1">All</option>
            <option value="1">Assigned</option>
            <option value="0">Not Assigned</option>
          </select>
        </div>
      </div>

      {/* Container to fetch excel file data */}
      {!excelView ?
        <div className="bulk_assign_button" style={{ paddingRight: '10px', margin: '5px 10px' }}>
          <input type="file" name="" accept=".xlsx,.xls" onChange={e => onExcelAction(e)} id="" style={{ backgroundColor: 'white' }} />
          <button className="form_button button_submit" onClick={() => takeActionExcel()} style={{ padding: '7px 10px', marginLeft: '5px' }}>Get List By Excel</button>
        </div>
        :
        <div className="bulk_assign_button" style={{ paddingRight: '10px', margin: '0px 10px' }}>
          <button className="form_button button_cancel" onClick={() => (setExcelView(false), setExcelData({ imeilist: [] }))} style={{ padding: '7px 10px', marginLeft: '5px', color: 'white' }}>Cancel List By Excel</button>
        </div>
      }

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

      {/* Loader */}
      {
        excelLoader && <LoadingWidget />
      }

      {/* Tables */}
      {
        (!excelLoader && !excelView) ?
          <>{

            userType === "DST" &&
            <ListTableConnect
              api={`${BaseURL}/DeviceInventory/getalldevicelistv2?eid=${eid}&fromDt=${fromDate}&toDt=${uptoDate}&roletype=${userType}&locate=${status}&cttatus=${1}&mnf_id=${manufacturerFiltered ? manufacturerFiltered : -1}&`}
              method="GET"
              columns={column}
              changeData={changeData}
              getData={(data) => setDataList(data?.devicelist)}
            />
          }</>
          :
          // Table from Excel Data
          <>{Array.isArray(excelDataList) && <ListTable dataList={excelDataList} columns={column} />}</>
      }
    </>
  );
};




// import React, { useState, useEffect } from "react";
// import { assigntorfc, imeiToList } from "../../apis/deviceInventory";
// import ListTableConnect from "../../components/Common/ListTableBP/ListTableConnect";
// import { BaseURL } from "../../constants/baseURL";
// import { useNavigate } from "react-router-dom";
// import './style.css'
// import { FaCheck, FaFilter } from 'react-icons/fa6'
// import { getManufacturerMappedToDST, getRFCMappedToMNF, getUsersInDST } from "../../apis/distributor";
// import { RotatingLines } from "react-loader-spinner";
// import Swal from "sweetalert2";
// import { ImCheckmark, ImCross } from "react-icons/im";
// import { getBeforeDate, getCurrentDate } from "../../components/Common/PowerUpFunctions";
// import readXlsxFile from "read-excel-file";
// import ListTable from "../../components/Common/Listtable/ListTable";
// import { LoadingWidget } from "../../components/loading";

// export const DeviceInventoryListRfcAssign = () => {

//   const [status, setStatus] = useState(0) // url param status
//   const [changeData, setChangeData] = useState(0) // change event data
//   const [toggle, setToggle] = useState(-1) // toggle button to action
//   const [entityId, setEntityId] = useState(-1) // store entity id
//   const [loader, setLoader] = useState(false) // loader status
//   const [bulkStatus, setBulkStatus] = useState(false) // bulk status
//   const [bulkData, setBulkData] = useState([]) // store bulk data
//   const [dataList, setDataList] = useState([]) // store response data
//   const [rfcList, setRfcList] = useState([]) // To store RFC user list
//   const [fromDate, setFromDate] = useState(getBeforeDate(90)) // initial from Date (before 3 days)
//   const [uptoDate, setUptoDate] = useState(getCurrentDate()) // initial upto date
//   const [excelData, setExcelData] = useState({ imeilist: [] }) // initial excel data
//   const [excelDataList, setExcelDataList] = useState(null) // to store data from excel
//   const [excelView, setExcelView] = useState(false) // to toggle excel data view
//   const [excelLoader, setExcelLoader] = useState(false) // excel process loader
//   const [searchIMEI, setSearchIMEI] = useState("")
//   const [manufacturerSelection, setManufacturerSelection] = useState([])
//   const [manufacturerFiltered, setManufacturerFiltered] = useState(null)

//   const navigate = useNavigate() // navigate constant

//   // constant variables
//   let userType = sessionStorage.getItem("userType");
//   let eid = sessionStorage.getItem("entityId");


// // To Fetch Manufacturers Mapped to this distributor
// const fetchManufacturersList = async () => {
//   const response = await getManufacturerMappedToDST()
//   if(response?.status){
//     setManufacturerSelection(response?.result)
//   }
// }

// // calling function on page render
// useEffect(() => {
//   fetchManufacturersList()
// }, []);


// // To Fetch Manufacturers Mapped to this distributor
// const fetchRFCMappedList = async () => {
//   const response = await getRFCMappedToMNF(manufacturerFiltered)
//   console.log(response, "fetchRFCMappedList")

//   if(response?.status){
//     setRfcList(response?.result)
//   }
// }

// // calling function on page render
// useEffect(() => {
//   if(manufacturerFiltered && fetchRFCMappedList !== ""){
//     fetchRFCMappedList()
//   }
  
// }, [manufacturerFiltered]);



//   // to handle url param change
//   const handleChange = (e) => {
//     const value = e.target.value;
//     setStatus(parseInt(value))
//     setChangeData(changeData + 1)
//   }

//   // Function for api to assign
//   const assingFun = async (obj, type = '') => {

//     let body;

//     switch (type) {

//       case 'bulk': {

//         if (bulkData?.length == 0) {
//           Swal.fire({
//             icon: "error",
//             title: "",
//             text: `No any inventory selected to Assign`,
//           });
//           return;
//         }

//         body = bulkData?.map((item) => {
//           return { ...item, entityId: parseInt(entityId) };
//         });

//       } break;

//       default: {
//         body = [{
//           id: String(obj?.id),
//           imeiNo: obj?.imeiNo,
//           entityid: parseInt(entityId)
//         }]
//       }

//     }

//     console.log('request body: ', body)
//     // return;
//     setLoader(true)

//     const apiHitting = await assigntorfc(body)

//     if (apiHitting?.status == true) {

//       setLoader(false)

//       Swal.fire({
//         icon: "success",
//         title: "Action Taken Successfully",
//         text: apiHitting?.message,
//       });

//       setToggle(-1)

//       setChangeData(changeData + 1)

//     } else {
//       setLoader(false)
//     }

//   }

//   // Bulk assing button status handle
//   const handleBulkStatus = (status) => {
//     console.log(status,dataList, "dst_user_id")
//     setBulkStatus(status)

//     if (status) {
//       setToggle(-1)
//       setEntityId(-1)

//       let tempData = dataList?.filter(item => (item?.ctStatus == 1 && (item?.rfcId == null || item?.rfcId == 0)))?.map((elem) => {
//         return {
//           id: String(elem?.id),
//           imeiNo: elem?.imeiNo,
//         }
//       })

//       setBulkData(tempData)

//     } else {
//       setBulkData([])
//     }
//   }

//   // To handle change event in table checkbox
//   const handleBulkChange = (e) => {
//     const checkStatus = e.target.checked;
//     const value = e.target.value;


//     switch (checkStatus) {

//       case true: {
//         let tempData = dataList?.filter(item => (item?.ctStatus == 1 && item?.rfcId == null && item?.id == value))?.map((elem) => {
//           return {
//             id: String(elem?.id),
//             imeiNo: elem?.imeiNo,
//           }
//         })
//         setBulkData(prev => [...prev, tempData[0]])
//       } break;
      
//       case false: {
//         let tempData = bulkData?.filter(item => item?.id != value)?.map((elem) => {
//           return {
//             id: String(elem?.id),
//             imeiNo: elem?.imeiNo,
//           }
//         })
//         setBulkData(tempData)
//       } break;

//     }
//   }

//   // to keep checkbox checked or not
//   const checkValueStatus = (value) => {
//     let status = bulkData?.length > 0 && bulkData?.some(item => item?.id == value)
//     return status;
//   }

//   // To Excel file handle change and storing excel data
//   const onExcelAction = async (e) => {

//     try {
//       const file = e.target.files[0];

//       // if (checkFile(file, 'excel') == false) {
//       //   return;
//       // }

//       const rows = await readXlsxFile(file);

//       console.log("Rows read from file:", rows);

//       if (rows.length === 0 || rows[0].length === 0) {
//         Swal.fire({
//           icon: "error",
//           title: "",
//           text: "Empty file or invalid format",
//         })
//         return;
//       }

//       if (rows[0].length > 1) {
//         Swal.fire({
//           icon: "error",
//           title: "",
//           text: "There must be only one column i.e. 'imei'",
//         })
//         return;
//       }

//       if (String(rows[0][0])?.toLowerCase() != 'imei') {
//         Swal.fire({
//           icon: "error",
//           title: "",
//           text: "Header must be 'imei'",
//         })
//         return;
//       }

//       let tempData = rows.slice(1,)?.flat()?.map(item => String(item))
//       setExcelData({ imeilist: tempData })

//       console.log('excel data: ', tempData)
//     } catch (error) {
//       console.error("Error processing file:", error.message);
//     }
//   };

//   // Fetching list from excel
//   const takeActionExcel = async () => {

//     if (excelData?.imeilist?.length <= 0) {
//       Swal.fire({
//         icon: "error",
//         title: "",
//         text: "Select Excel File",
//       })
//       return;
//     }

//     setExcelLoader(true)

//     const response = await imeiToList(excelData)
//     console.log('excel response: ', response)

//     if (response?.status) {
//       setExcelDataList(response?.result ?? [])
//       setDataList(response?.result ?? [])
//       setExcelView(response?.status)
//     }

//     setExcelLoader(false)
//   }

//   // To Filter data
//   const filterFun = () => {

//     let todayDate = getCurrentDate()

//     if (fromDate > uptoDate) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'From date must be less than Upto Date'
//       })
//       return;
//     }

//     if (uptoDate > todayDate) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: "Upto date must be less than or equal to Today's Date"
//       })
//       return;
//     }

//     if (uptoDate < fromDate) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Upto date must be greater or equal to From Date'
//       })
//       return;
//     }

//     setChangeData(changeData + 1)

//   }

//   // Table Column
//   const column = [
//     {
//       Header: '#',
//       Cell: ({ cell }) => <>
//         {bulkStatus ?
//           <>
//             {
//               cell?.row?.original?.rfcId ?
//                 <><FaCheck fill="#0f5" size={20} /></>
//                 :
//                 <div className="field_wrapper field_wrapper_row">
//                   <div className="radio_selection">
//                     <input checked={checkValueStatus(cell?.row?.original?.id)} onChange={(e) => handleBulkChange(e)} value={cell?.row?.original?.id} style={{ height: '1rem', width: '1rem', cursor: 'pointer' }} type="checkbox" name="greenType" id="Acceleration" />
//                   </div>
//                 </div>
//             }

//           </>
//           :
//           <>
//             {cell?.row?.index + 1}
//           </>
//         }

//       </>
//     },
//     {
//       Header: "Device Serial No",
//       accessor: "deviceSerialNo",
//       Cell: ({ cell }) => <>
//         <div onClick={() => navigate(`/deviceInventory/details/${cell?.row?.original?.imeiNo}`, { state: cell?.row?.original })} className="" style={{ display: 'flex', gap: '5px', alignContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
//           <span style={{ color: '#42a4f5' }}>{cell?.row?.original?.deviceSerialNo}</span>
//         </div>
//       </>
//     },
//     {
//       Header: "IMEI No",
//       accessor: "imeiNo",
//       Cell: ({ cell }) => (cell?.row?.original?.imeiNo || "N/A")
//     },
//     {
//       Header: "ICCID Number",
//       accessor: "iccidNumber",
//       Cell: ({ cell }) => (cell?.row?.original?.iccidNumber || "N/A")
//     },
//     {
//       Header: "VLTD Model Code",
//       accessor: "vltdModelCode",
//       Cell: ({ cell }) => (cell?.row?.original?.vltdModelCode || "N/A")
//     },
//     // {
//     //   Header: "Entity ID",
//     //   accessor: "intuchEntityId",
//     //   Cell: ({ cell }) => (cell?.row?.original?.intuchEntityId || "N/A")
//     // },
//     {
//       Header: "Action",
//       Cell: ({ cell }) => <>

//         {/* For DST */}
//         {cell?.row?.original?.ctStatus == 1 && cell?.row?.original?.distEntityCode && <>
//           {
//             cell?.row?.original?.rfcId ?
//               <span style={{ padding: '5px 7px', fontSize: '14px', fontWeight: '700', color: 'green' }}>Assigned</span>
//               :
//               <>

//                 {
//                   cell?.row?.original?.ctStatus == 1 && cell?.row?.original?.distEntityCode && toggle != cell?.row?.original?.id &&
//                   <button disabled={bulkStatus} style={{ border: '1px solid red', padding: '5px 7px', fontSize: '12px', fontWeight: '600', backgroundColor: 'rgba(255, 0, 0, 0.8)', color: 'white', cursor: 'pointer' }} onClick={() => (setToggle(cell?.row?.original?.id), setEntityId(-1))}>Assign</button>
//                 }

//                 {
//                   !bulkStatus && toggle == cell?.row?.original?.id &&
//                   <>
//                     <div className="cell_action">
//                       <select name="" id="" disabled={loader} onChange={(e) => setEntityId(e.target.value)} value={entityId}>
//                         <option value="">Select</option>
//                         {
//                           Array.isArray(rfcList) &&
//                           rfcList?.map((elem, index) =>
//                             <option key={index} value={elem?.userid}>{elem?.fullname}</option>
//                           )
//                         }
//                       </select>

//                       {!loader ? <>
//                         {entityId != -1 && <attr title="Confirm" className="cell_check" onClick={() => assingFun(cell?.row?.original)}><ImCheckmark size={18} /></attr>}
//                         <att title="Cancel" className="cell_cross" onClick={() => setToggle(-1)}><ImCross /></att>
//                       </>
//                         :
//                         <>
//                           <div className="loader-spin">
//                             <RotatingLines
//                               visible={true}
//                               height="20"
//                               width="20"
//                               color="#000"
//                               strokeWidth="5"
//                               strokeColor="grey"
//                               animationDuration="0.75"
//                               ariaLabel="rotating-lines-loading"
//                               wrapperStyle={{}}
//                               wrapperClass=""
//                             />
//                           </div>
//                         </>}
//                     </div>
//                   </>
//                 }
//               </>
//           }
//         </>}

//       </>,
//       width: '10rem'
//     }
//   ]

//   console.log(manufacturerFiltered, "setManufacturerFiltered")

//   return (
//     <>

//       {/* Top Container */}
//       <div className="alarm_header">

//         {/* Heading */}
//         <div className='heading_container'>
//           RFC Assign Inventory List <i style={{ fontWeight: '600', fontSize: '14px' }}>{excelView && "(Showing Excel Data List)"}</i>
//         </div>

//         {/* Left Action Buttons */}
//         <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
//           {
//             manufacturerSelection.length > 0 && <select onChange={(e)=>{
//                                                             setManufacturerFiltered(e.target.value)
//                                                             setChangeData(prev=>prev+1)}}>
//               <option value="" >Select</option>
//                     {
//                       Array.isArray(manufacturerSelection) &&
//                       manufacturerSelection?.map((elem, index) =>
//                         <option key={elem.id} value={elem.id}>{elem.entity_name}</option>
//                       )
//                     }
//             </select>
//           }
//           {userType == 'DST' && <div className="bulk_assign_button">
//             {!bulkStatus ?
//               <button className='form_button button_reset' onClick={() => handleBulkStatus(true)}>
//                 Bulk Assign
//               </button>
//               :
//               <>
//                 <div className="cell_action">
//                   <select name="" id="" disabled={loader} onChange={(e) => setEntityId(e.target.value)} value={entityId}>
//                     <option value={-1} disabled>Select</option>
//                     {
//                       Array.isArray(rfcList) &&
//                       rfcList?.map((elem, index) =>
//                         <option key={elem.id} value={elem.id}>{elem?.entity_name}</option>
//                       )
//                     }
//                   </select>

//                   {!loader ? <>
//                     {entityId != -1 && <attr title="Confirm" className="cell_check" onClick={() => assingFun(null, 'bulk')}><ImCheckmark size={18} /></attr>}
//                     <attr title="Cancel" className="cell_cross" onClick={() => handleBulkStatus(false)}><ImCross /></attr>
//                   </>
//                     :
//                     <>
//                       {/* Loader */}
//                       <div className="loader-spin">
//                         <RotatingLines
//                           visible={true}
//                           height="20"
//                           width="20"
//                           color="#000"
//                           strokeWidth="5"
//                           strokeColor="grey"
//                           animationDuration="0.75"
//                           ariaLabel="rotating-lines-loading"
//                           wrapperStyle={{}}
//                           wrapperClass=""
//                         />
//                       </div>
//                     </>}
//                 </div>
//               </>}
//           </div>}
//           <select className="alarm_filter" name="" id="" onChange={handleChange} value={status}>
//             <option value="-1">All</option>
//             <option value="1">Assigned</option>
//             <option value="0">Not Assigned</option>
//           </select>
//         </div>
//       </div>

//       {/* Container to fetch excel file data */}
//       {!excelView ?
//         <div className="bulk_assign_button" style={{ paddingRight: '10px', margin: '5px 10px' }}>
//           <input type="file" name="" accept=".xlsx,.xls" onChange={e => onExcelAction(e)} id="" style={{ backgroundColor: 'white' }} />
//           <button className="form_button button_submit" onClick={() => takeActionExcel()} style={{ padding: '7px 10px', marginLeft: '5px' }}>Get List By Excel</button>
//         </div>
//         :
//         <div className="bulk_assign_button" style={{ paddingRight: '10px', margin: '0px 10px' }}>
//           <button className="form_button button_cancel" onClick={() => (setExcelView(false), setExcelData({ imeilist: [] }))} style={{ padding: '7px 10px', marginLeft: '5px', color: 'white' }}>Cancel List By Excel</button>
//         </div>
//       }

//       {/* Container to filter data list */}
//       <div style={{display:"grid", gridTemplateColumns:"2fr 1fr"}}>
//             <form className="filter_container">

//               <div className="field_wrapper">
//                 <label htmlFor="fromDate">From Date:</label>
//                 <input type="date" name="fromDate" value={fromDate} onChange={(e) => (setFromDate(e.target.value), setUptoDate(getCurrentDate()))} max={getCurrentDate()} id="" />
//               </div>

//               <div className="field_wrapper">
//                 <label htmlFor="uptoDate">Upto Date:</label>
//                 <input type="date" name="uptoDate" value={uptoDate} onChange={e => setUptoDate(e.target.value)} disabled={fromDate == ''} min={fromDate} max={getCurrentDate()} id="" />
//               </div>

//               <div className="filter_button" onClick={() => filterFun()}> <span><FaFilter size={18} fill="#fff" /></span><span>Search</span></div>

//             </form>

//             <form className="filter_container">

//               <div>
//                 <p><label htmlFor="fromDate">Search By IMEI</label></p>
//                 <input type="text" name="imei" value={searchIMEI} onChange={(e) => setSearchIMEI(e.target.value)} id="" />
//               </div>

//               <div className="filter_button" onClick={() => navigate(`/deviceInventory/details/${searchIMEI}`)}> <span>Search IMEI</span></div>

//             </form>
//             </div>

//       {/* Loader */}
//       {
//         excelLoader && <LoadingWidget />
//       }

//       {/* Tables */}
//       {
//         (!excelLoader && !excelView) ?
//           <>
          
//           {

//             userType === "DST" &&
//             <ListTableConnect
//               api={`${BaseURL}/DeviceInventory/GetDeviceAllListassignDst?fromDt=${fromDate}&toDt=${uptoDate}&status=${-1}&assign=0&mnf_id=${manufacturerFiltered ? manufacturerFiltered : -1}&`}
//               method="GET"
//               columns={column}
//               changeData={changeData}
//               getData={(data) => setDataList(data?.devicelist)}
//             />
//           }
          
//           </>
//           :
//           // Table from Excel Data
//           <>{Array.isArray(excelDataList) && <ListTable dataList={excelDataList} columns={column} />}</>
//       }
//     </>
//   );
// };


