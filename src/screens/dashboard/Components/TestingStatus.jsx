import React, { useEffect, useState } from 'react'
import '../../manufacturers/components/UploadDetaisMNF.css'
import '../../deviceApproval/components/DeviceTesting.css'
import ListTable from '../../../components/Common/Listtable/ListTable';

import { getTestingDeviceList } from '../../../apis/dashboardApi';
import DeviceDetailsTableEmplanment from './DeviceTableEmplanlment';
import { getAllApprovedDeviceUser, getDeviceApprovalByEID } from '../../../apis/masters';

import { addAppointmentData, getAppointments, updateAppointmentData } from '../../../apis/appointment';

const TestingStatus = ({manufacturerData,setStage, usersList, setCompletedItems}) => {
  
  const userType = sessionStorage.getItem("userType")

  const [topTableData, setTopTableData] = useState([])
  const [uploadedDevice, setUploadedDevice] = useState(null)
  console.log(topTableData, "setTopTableData")
  const [appointmentDetail, setAppointmentDetail] = useState(null)
  const [appointmentDate, setAppointmentDate] = useState(null)
  const [recievingPerson, setRecievingPerson] = useState(null)
  const [modifyAppointment, setModifyAppointment] = useState(false)

  console.log(topTableData, "topTableData")

  const getAppointmentDetail = async () => {
    const appointments = await getAppointments(uploadedDevice?.modelCode)
    
    if(appointments?.status && appointments?.result && appointments?.result?.length>0){
      setAppointmentDetail(appointments?.result[0])
    }
    
  }

  console.log(appointmentDetail, "appointmentDetail")

  useEffect(()=>{
    if(uploadedDevice){
      getAppointmentDetail()
    }
  },[uploadedDevice])

  
  useEffect(() => {
    const fetchApprovalDevices = async () => {

      if (userType === "SBU" || userType === "SUA") {
        console.log(manufacturerData)
        const response = await getDeviceApprovalByEID(manufacturerData?.id)
        console.log(response, "fetched from State backend")
        setUploadedDevice(response[0])
      }

      if (userType === "MNF") {
        const response = await getAllApprovedDeviceUser()
        console.log(response, "fetched Device from MNF")
        setUploadedDevice(response[0])
      }
    }
    fetchApprovalDevices()
  }, [])


  const [loader, setLoader] = useState(false)
  const [bottomTableData, setBottomTableData] = useState('')

  const fetchDeviceTestingData = async () => {
    setLoader(true)
    
    const data = await getTestingDeviceList(uploadedDevice?.modelCode)

    if (data?.status) {
      setLoader(false)
      setTopTableData(data?.result)
      
    } else {
      setLoader(false)
    }
  }

  useEffect(() => {
    uploadedDevice && uploadedDevice?.modelCode && fetchDeviceTestingData()
  }, [uploadedDevice])

  
  const topTableColumn = [
    {
      Header: '#',
      Cell: ({ row }) => <span>{row?.index + 1}</span>
    },
    {
      Header: 'Device Serial No.',
      accessor: 'deviceSerialNo',
      Cell: ({ cell }) => (<>
        <span>{cell?.row?.original?.deviceSerialNo || 'N/A'}</span>
      </>)
    },
    {
      Header: 'ICCID',
      accessor: 'iccid',
      Cell: ({ cell }) => (<>
        <span>{cell?.row?.original?.iccid || 'N/A'}</span>
      </>)
    },
    {
      Header: 'IMEI',
      accessor: 'imei',
      Cell: ({ cell }) => (<>
        <span>{cell?.row?.original?.imei || 'N/A'}</span>
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
      Header: 'Action',
      Cell: ({ cell }) => <>
        <span className='' style={{ color: 'white', padding: '5px 7px', display: 'flex', justifyContent: 'center', width: 'max-content', alignItems: 'center', backgroundColor: 'rgba(0, 170, 0, 0.848)', cursor: 'pointer' }} onClick={() => setBottomTableData(cell?.row?.original)}>Log Details</span>
      </>
    }
  ]

  const bookAppointment = async () => {
    
    if(!appointmentDate || appointmentDate < new Date() || !recievingPerson || recievingPerson.trim() === ""){
      console.log()  
      return null
    }

    const data = {
                    name: usersList[0]?.fullname,
                    email:usersList[0]?.emailid,
                    mobile:usersList[0]?.contactNo,
                    aptDate:appointmentDate, 
                    aptBy:recievingPerson.trim(),
                    deviceModel: uploadedDevice?.modelCode
                  }

    const response = await addAppointmentData(data)
    if(response?.status){
      return null
    }
    
  }

  const updateAppointment = async () => {
    
    const data = {...appointmentDetail, aptDate:appointmentDate, status:0}
    console.log(data, "updateAppointmentData")
    const response = await updateAppointmentData(data)
    if(response?.status){
      getAppointmentDetail()
      setModifyAppointment(false)
      
    }
  
  } 

  const appointmentDetailUI = () => {
    
    return <div  style={{backgroundColor:"white", padding:"15px", margin:"7px"}}>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"10px", marginTop:"5px"}}>
              
              <div>
                <label style={{fontSize:"12px", color:"grey"}}><b>Name</b></label>
                <p>{appointmentDetail?.name}</p>
              </div>
              <div>
                <label style={{fontSize:"12px", color:"grey"}}><b>Email</b></label>
                <p>{appointmentDetail?.email}</p>
              </div>
              <div>
                <label style={{fontSize:"12px", color:"grey"}}><b>Contact</b></label>
                <p>{appointmentDetail?.mobile}</p>
              </div>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"10px", marginTop:"15px"}}>
          {!modifyAppointment ? <div>
                                  <label style={{fontSize:"12px", color:"grey"}}><b>Appointment Date</b></label>
                                  <p>{appointmentDetail?.aptDate.replace("T", " ")}</p>
                                </div> : 
                                <div>
                                  <label style={{fontSize:"12px", color:"grey"}}><b>Select Date</b></label>
                                  <input style={{ outline: 'none', border: '1px solid gainsboro', display:"block", width:"90%", fontSize:"0.8rem" }} type="datetime-local" name="appointmentDate" onChange={(e) => setAppointmentDate(e.target.value)} />
                                </div>}
              
              <div>
                <label style={{fontSize:"12px", color:"grey"}}><b>Tester Name</b></label>
                <p>{appointmentDetail?.aptBy}</p>
              </div>
          </div>
          {(userType === "SBU" || userType === "SUA") ? !modifyAppointment ? 
            <div className="form-submit-btn" style={{padding:"5px 10px"}}>
              <button style={{padding:"0.5rem 2rem", backgroundColor:"blue", marginTop:"10px"}} onClick={()=>setModifyAppointment(true)}>Update</button>
            </div> 
            : 
            <div className="form-submit-btn" style={{padding:"5px 10px"}}>
              <button style={{padding:"0.5rem 2rem", backgroundColor:"blue", marginTop:"10px"}} onClick={()=>updateAppointment()}>Update</button>
            </div> : null}
    </div>
  }


  


  return (
    <>
      <div style={{marginTop:"10px", padding:"5px"}}>
        <p><b>Appointment Detail</b></p>
        {appointmentDetail ? appointmentDetailUI() : (userType === "SBU" || userType === "SUA") ? <div style={{backgroundColor:"white", padding:"15px", margin:"7px"}}>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"10px", marginTop:"5px"}}>
              
              <div>
                <label style={{fontSize:"12px", color:"grey"}}><b>Full Name</b></label>
                <p>{usersList[0]?.fullname}</p>
              </div>
              <div>
              <label style={{fontSize:"12px", color:"grey"}}><b>Email</b></label>
                <p>{usersList[0]?.emailid}</p>
              </div>
              <div>
              <label style={{fontSize:"12px", color:"grey"}}><b>Contact</b></label>
                <p>{usersList[0]?.contactNo}</p>
              </div>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"10px", marginTop:"15px"}}>
              <div>
                <label style={{fontSize:"12px", color:"grey"}}><b>Select Date</b></label>
                <input style={{ outline: 'none', border: '1px solid gainsboro', display:"block", width:"90%", fontSize:"0.8rem" }} type="datetime-local" name="appointmentDate" onChange={(e) => setAppointmentDate(e.target.value)} />
              </div>
              
              <div>
                <label style={{fontSize:"12px", color:"grey"}}><b>Tester</b></label>
                <input style={{ outline: 'none', border: '1px solid gainsboro', display:"block", width:"90%", fontSize:"0.8rem" }} type="text" name="testerName" onChange={(e) => setRecievingPerson(e.target.value)} />
              </div>
          </div>
          <div className="form-submit-btn" style={{padding:"5px 10px"}}>
            <button style={{padding:"0.5rem 2rem", backgroundColor:"blue", marginTop:"10px"}} onClick={()=>bookAppointment()}>Submit</button>
          </div>
        </div> : <p>No Appointment given Yet</p>}
    </div>  
    <p className='emplament-heading'>Testing Status</p>
      <div className="testing_container">

        {/* Table */}
        {topTableData && <ListTable viewStatus={true} dataList={topTableData} columns={topTableColumn} />}

        {bottomTableData && <div className="testing_details">
          <div className="bottom_table_container">
            <DeviceDetailsTableEmplanment
              dataList={bottomTableData}
            />
          </div>          
        </div>}
      </div>
    {console.log(userType === "SBU" , userType === "SUA" , uploadedDevice?.approvedbysb)}
    
    </>
  )
}

export default TestingStatus

