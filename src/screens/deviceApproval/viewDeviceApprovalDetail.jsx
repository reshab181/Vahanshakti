import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BaseURL } from '../../constants/baseURL';
import './style.css'
import ListTable from '../../components/Common/Listtable/ListTable';
import { getTestingDeviceList } from '../../apis/dashboardApi';
import { deviceApprovedBySB } from '../../apis/masters';
import Swal from 'sweetalert2';
import { indianDate, nullToNA } from '../../components/Common/PowerUpFunctions';
// import { getDocumentFullUrl } from '../../../apis/manufacture';
import { getDocumentFullUrl } from '../../apis/manufacture';
import { FaPrint } from "react-icons/fa";
import { generateDeviceTestingPDF } from '../../helpers/pdf';


export const ViewDeviceApprovalDetail = (props) => {

  const [dataList, setDataList] = useState(null)
  const [loader, setLoader] = useState(false)
  const location = useLocation()
  const [tableData, setTableData] = useState([])
  const [remarks, setRemarks] = useState('')
  const [imeiRawPackets, setIMEIRawPackets] = useState(null)

  console.log(imeiRawPackets,tableData, "tableData112")


  const navigate = useNavigate()
  // useEffect(()=>{
  //   console.log(location.state);
  // },[location.state])
  
  let userType = sessionStorage.getItem('userType')

  const fetchData = async (code) => {
    setLoader(true)
  
    const url = `${BaseURL}/DeviceApproval/getdeviceapproval?code=${code}`;
    let token = sessionStorage.getItem("token");

    console.log(url)
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response?.ok) {
        const data = await response.json();
        console.log('resp coming => ', data)
        setDataList(data?.result)
      } else {
        throw new Error('Request failed');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
    finally {
      setLoader(false)
    }
  }
   console.log(dataList,"123");
  const fetchDeviceTestingData = async (mCode) => {

    setLoader(true)

    const data = await getTestingDeviceList(mCode)

    console.log('fetch device details: ', data)

    if (data?.status) {
      setLoader(false)
      setTableData(data?.result)
      console.log(data?.result, "Testing device Data")
    } else {
      setLoader(false)
    }

  }
  console.log('location data', location)

  useEffect(() => {
    console.log(location?.state?.mCode);
    fetchData(location?.state?.mCode)
    fetchDeviceTestingData(location?.state?.mCode)
  }, [location?.state])

  const getFileUrl = async (docname) => {
    const fileUrl = await getDocumentFullUrl(docname)
    return fileUrl;
  }

  const handleViewFile = async (docname) => {
    const fileUrl = await getFileUrl(docname);
    window.open(fileUrl, '_blank');
  };
const contentView = (name = '', value = '', file = false, isDate = false, type = '') => {
    let docname = '';

    if (['ddDet', 'fileUploadProtocolSpec', 'tacCertificate', 'copCertificate'].includes(name)) {
      const parsedValue = JSON.parse(value);
      docname = parsedValue && parsedValue.docname ? parsedValue.docname : '';
      console.log(docname);

      return (
        <>
          <div className={`table-card-cell ${type == 'full' && ' full_width'}`}>
            <span className="table-card-key sub-heading">{name} </span>
            {/* <a href={docname} download={`${name}.png`} target='blank' rel='noreferrer'> */}
              {docname &&<button style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }} onClick={async () => window.open(await getFileUrl(docname), '_blank')}>View</button>}
            {/* </a> */}
          </div>
        </>
      )
    } else {
      return (
        <>
          {!Array.isArray(value) && <div className={`table-card-cell ${type == 'full' && ' full_width'}`}>
            <span className="table-card-key sub-heading">{name} </span>
            <div className="table-card-value text">{isDate ? indianDate(value) : nullToNA(value)}</div>
          </div>}
        </>
      )
    }
  }
  const renderTableRows = () => {
    return Object.keys(dataList).map((key, index) => {
      let value = dataList[key];
  
      if (typeof value === 'string') {
        
          value = JSON.parse(value);
        
      }
  
      if (['copCertificate', 'fileUploadProtocolSpec', 'fileUploadTechnicalSpec', 'tacCertificate', 'ddDet'].includes(key) && typeof value === 'object' && value && value.docname) {
        return (
          <tr key={index}>
            <td>{key}</td>
            <td style={{ display: "flex", alignItems: "center" }}>
              <p>{key}</p>
              <button onClick={() => handleViewFile(value.docname)} style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}>View</button>
            </td>
          </tr>
        );
      }
  
      return (
        <tr key={index}>
          <td>{key}</td>
          <td>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
        </tr>
      );
    });
  };

  
  const tableColumn = [
    {
      Header: '#',
      Cell: ({ row }) => <span>{row?.index + 1}</span>
    },
    {
      Header: 'Device Serial No.',
      accessor: 'deviceSerialNo',
      Cell: ({ cell }) => (<>
        <span style={{ color: '#42a4f5' }}>{cell?.row?.original?.deviceSerialNo || 'N/A'}</span>
      </>)
    },
    {
      Header: 'ICCID',
      accessor: 'iccid',
      Cell: ({ cell }) => (<>
        <span style={{ color: '#42a4f5' }}>{cell?.row?.original?.iccid || 'N/A'}</span>
      </>)
    },
    {
      Header: 'IMEI',
      accessor: 'imei',
      Cell: ({ cell }) => (<>
        <span style={{ color: '#42a4f5' }}>{cell?.row?.original?.imei || 'N/A'}</span>
      </>)
    },
    {
      Header: 'Model Code',
      accessor: 'modelCode',
      Cell: ({ cell }) => (<>
        <span> {cell?.row?.original?.modelCode || 'N/A'}</span>
      </>)
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ cell }) => (<>
        {
          cell?.row?.original?.status == '1' &&
          <span style={{ color: 'white', padding: '5px 7px', display: 'flex', justifyContent: 'center', width: 'max-content', alignItems: 'center', backgroundColor: 'green' }}>Approved</span>
        }

        {
          cell?.row?.original?.status == '2' &&
          <span style={{ color: 'white', padding: '5px 7px', display: 'flex', justifyContent: 'center', width: 'max-content', alignItems: 'center', backgroundColor: 'rgba(255, 0, 0, 0.8)' }}>Rejected</span>
        }

        {
          cell?.row?.original?.status == '0' &&
          <span style={{ color: 'white', padding: '5px 7px', display: 'flex', justifyContent: 'center', width: 'max-content', alignItems: 'center', backgroundColor: '#cccc00' }}>Not Received</span>
        }
      </>)
    },
    {
      Header: 'Packet',
      accessor: 'packets',
      Cell: ({ cell }) => (<>
        <button onClick={()=>setIMEIRawPackets(cell?.row?.original?.imei)} >Detail</button>
      </>)
    }
  ]

  const checkStatus = () => {
    let check = tableData?.filter(item => item?.status == 1)
    return (check?.length == tableData?.length)
  }

  const handleSubmit = async () => {
    let body;

    if (remarks == '') {
      alert('Enter remarks')
      return;
    } else {
      body = {
        id: parseInt(dataList?.id),
        modelCode: dataList?.modelCode,
        status: checkStatus() ? 1 : 0,
        remarks: remarks,
      }
    }

    setLoader(true)

    const apiHitting = await deviceApprovedBySB(body)
    console.log(apiHitting, "apiHitting")
    if (apiHitting?.status == true) {
      console.log(apiHitting, "approval response")
      setLoader(false)

      Swal.fire({
        icon: "success",
        title: "Approved Successfully",
        text: apiHitting?.message,
      });

      navigate('/deviceApproval/deviceApprovalAllList')

    } else {
      setLoader(false)
    }


  }

  return (
    <>
      <div className="id_container">
        <div className="id_top_container">
          <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
            <h3>Device Approval Details</h3>
            <FaPrint size="1rem" onClick={()=>generateDeviceTestingPDF(dataList, tableData)}/>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"2fr 3fr"}}>
            <div className="id_top_content_container">
              {
                loader && <i>Loading...</i>
              }
              {!loader && dataList &&
                Object?.keys(dataList)?.map((key, index) =>
                  contentView(
                    key, 
                    dataList[key], 
                    ['copCertificate', 'fileUploadProtocolSpec', 'fileUploadTechnicalSpec', 'tacCertificate', 'ddDet'].includes(key),
                    ['copCertificateExpiry', 'copApprovalDate', 'approvedon', 'uploadedon', 'createdOn', 'tacApprovalDate', 'tacCertificateExpiry'].includes(key),
                    )
                )
              }
            </div>
            {!loader && location?.state?.approve && tableData && tableData?.length > 0 &&
              <div className="id_top_content_container" style={{ width: '100%'}}>
                <ListTable viewStatus={true} dataList={tableData} columns={tableColumn} />
                {(userType == 'SUA' || userType == "SBU") && dataList?.approvalstatusbysb !== 1 &&
                  <div style={{ display: 'flex', gap: '5px', margin: '10px', backgroundColor: 'gainsboro', padding: '5px 10px', alignItems: 'center', width: '100%' }}>
                    <input onChange={(e) => setRemarks(e.target.value)} type="text" name="" placeholder='Enter Remarks' style={{ width: '100%', padding: '5px', border: '1px solid gainsboro', color: 'rgba(0,0,0,0.8)', outline: 'none', fontWeight: '500' }} id="" />
                    <button onClick={() => handleSubmit()} disabled={loader} style={{ width: '20%', height: '100%', border: 'none', padding: '5px 7px', backgroundColor: 'green', color: 'white', cursor: 'pointer' }}>{loader ? "Loading..." : "Approve"}</button>
                  </div>
                }
                <div style={{margin:"5px auto"}}>
                {imeiRawPackets && JSON.parse(tableData.filter(item=>item?.imei === imeiRawPackets)[0]["testingStatus"]).map(item=>
                                                                {return <div key={item} style={{display:"grid", gridTemplateColumns:"1fr 11fr", margin:"2px"}}>
                                                                  <p style={{padding:"2px", backgroundColor:"blue", fontSize:"11px", color:"white", margin:"1px"}}><b>{item?.code}</b></p>
                                                                  <p style={{padding:"2px", fontSize:"11px", wordBreak: "break-all", overflowWrap: "break-word", whiteSpace: "normal"}}>{item?.action}</p>
                                                                  
                                                                </div>})}
                </div>
              </div>
            }
            
          </div>
        </div>
      </div>
    </>
  );
};

