import React, { useEffect, useState } from 'react' 
import '../deviceApproval/components/DeviceTesting.css'
import ListTable from '../../components/Common/Listtable/ListTable';
import DeviceDetailsTable from './DeviceDetailsTable';
import { useNavigate, useParams } from 'react-router-dom';
import { updateTestingDeviceStatus, getTestingDeviceList } from '../../apis/dashboardApi';
import Swal from 'sweetalert2';
import MAPLayout from '../../components/map';
import { startRawPacketCollection } from '../../apis/devicetesting';
import { object } from 'yup';

export const DeviceDetailsTesting = () => {
  
  const initialEventData = [
    {"code":"LGN", "name": "Login Packet", 'status': '', 'action': '', 'matchText':'$LGN,' },
    {"code":"ACTVR", "name": "ACTV Packet", 'status': '', 'action': '', 'matchText':'$ACTVR,' },
    {"code":"HCHKR", "name": "HCHK Packet", 'status': '', 'action': '', 'matchText':'$HCHKR,' },
    {"code":"NR", "name": "PVT Packet", 'status': '', 'action': '', 'matchText':',NR,'},
    {"code":"IN", "name": "Ignition On Alert", 'status': '', 'action': '', 'matchText':',IN,' },
    {"code":"IF", "name": "Ignition Off Alert", 'status': '', 'action': '', 'matchText':',IF,' },
    {"code":"EA", "name": "Emergency On Primary", 'status': '', 'action': '', 'matchText':',EA,' },
    // {"code":11, "name": "Emergency Off Primary", 'status': '', 'action': '', 'matchText':',NR,' },
    {"code":"OT", "name": "OTA Update Alert", 'status': '', 'action': '', 'matchText':',OT,' },
    {"code":"HA", "name": "Harsh Acceleration", 'status': '', 'action': '', 'matchText':',HA,' },
    {"code":"HB", "name": "Harsh Breaking", 'status': '', 'action': '', 'matchText':',HB,' },
    {"code":"RT", "name": "Harsh Cornering", 'status': '', 'action': '', 'matchText':',RT,' },
    {"code":"BD", "name": "Battery Disconnect Alert", 'status': '', 'action': '', 'matchText':',BD,' },
    {"code":"BR", "name": "Battery Connect Alert", 'status': '', 'action': '', 'matchText':',BR,' },
    {"code":"BL", "name": "Device Low Battery Alert", 'status': '', 'action': '', 'matchText':',BL,' },
    // {"code":5, "name": "Device Low Battery Removed", 'status': '', 'action': '', 'matchText':',NR,' },
    {"code":"DT", "name": "Device Tamper Alert", 'status': '', 'action': '', 'matchText':',DT,' },
    {"code":"OS", "name": "Overspeed Alert", 'status': '', 'action': '', 'matchText':',OS,' },
    {"code":"TA", "name": "SOS Tamper Alert", 'status': '', 'action': '', 'matchText':',TA,' },
    {"code":"GI", "name": "Geofence Entry Alert", 'status': '', 'action': '', 'matchText':',GI,' },
    {"code":"GO", "name": "Geofence Exit Alert", 'status': '', 'action': '', 'matchText':',GO,' },
  ]

  const { mCode } = useParams()
  const navigate = useNavigate()
  const [topTableData, setTopTableData] = useState([])
  const [loader, setLoader] = useState(false)
  const [finalStatus, setFinalStatus] = useState('')
  const [currentId, setCurrentId] = useState(null)
  const [eventData, setEventData] = useState(initialEventData)
  
  console.log(eventData, "setEventData")


  useEffect(()=>{
    
    if(currentId && topTableData.length>0){
      
      let selectedDevice = topTableData.filter(elem => elem?.imei == currentId?.imei)[0]
      if(selectedDevice?.testingStatus){
        const eventsSavedData = JSON.parse(selectedDevice?.testingStatus)
        const successSavedData = eventsSavedData.filter(item=>item?.action!=="")
        
        const successSavedMap = {}
        successSavedData.forEach(element => {
          successSavedMap[element?.code]= {status:element?.status, action:element?.action}
        });
        
        const eventDataState = initialEventData.map(item=>{

          if(Object.keys(successSavedMap).includes(item?.code)){
            console.log(topTableData,successSavedMap, item, "topTableData")
            return {...item, action:successSavedMap[item?.code]["action"], status:successSavedMap[item?.code]["status"]}
          } else {
            return item
          }

        })
        setEventData(eventDataState)
      } else {
        setEventData(initialEventData)
      }
    }
  }, [currentId])

  const rawDataPacketCollection = async (imei) => {
    try {
      const response = await startRawPacketCollection(imei);
  
      Swal.fire({
        icon: 'success',
        title: 'Raw Packet Collection Started',
        text: 'Raw packet collection has started successfully!',
      });
    } catch (error) {
      console.error('Error starting raw packet collection:', error);
  
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to start raw packet collection. Please try again later.',
      });
    }
  }
  
  const fetchDeviceTestingData = async () => {
    setLoader(true)
    const data = await getTestingDeviceList(mCode)
    if (data?.status) {
      setLoader(false)
      setTopTableData(data?.result)
    } else {
      setLoader(false)
    }
  }
  
  useEffect(() => {
    fetchDeviceTestingData()
  }, [mCode])

  const handleStatusChange = (data, value) => {
    
    setEventData((prevState) => {
        const newState = prevState.map(elem => {
          if (elem?.code === data?.code) {
            return { ...elem, status: value };
          } else {
            return elem;
          }
        });
        return newState;
      });
  }

  const handleActionChange = (data, value) => {
    
      setEventData((prevState) => {
        const newState = prevState.map(elem => {
          if (elem?.code === data?.code) {
            return { ...elem, action: value?.raw };
          } else {
            return elem;
          }
        });
        return newState;
      });
    
  }

  const saveTestEvent = () => {
    updateDeviceTesting()
  }

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
      Header: 'Raw Packet',
      accessor: 'raw_packet',
      Cell: ({ cell }) => (<>
        {
          cell?.row?.original?.status == '1' &&
          <span style={{ color: 'white', padding: '5px 7px', display: 'flex', justifyContent: 'center', width: 'max-content', alignItems: 'center', backgroundColor: 'red' }}>Testing  Closed</span>
        }
        {
          cell?.row?.original?.status == '2' &&
          <span style={{ color: 'white', padding: '5px 7px', display: 'flex', justifyContent: 'center', width: 'max-content', alignItems: 'center', backgroundColor: 'red' }}>Testing  Closed</span>
        }
        {
          cell?.row?.original?.status == '0' &&
          <span onClick={()=>rawDataPacketCollection(cell?.row?.original?.imei)} style={{ color: 'white', padding: '5px 7px', display: 'flex', justifyContent: 'center', width: 'max-content', alignItems: 'center', backgroundColor: 'green' }}>Start Collection</span>
        }
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
          <span style={{ color: 'white', padding: '5px 7px', display: 'flex', justifyContent: 'center', width: 'max-content', alignItems: 'center', backgroundColor: '#CCCC00' }}>Not Received</span>
        }
      </>)
    },
    {
      Header: 'Action',
      Cell: ({ cell }) => <>
        <span className='' style={{ color: 'white', padding: '5px 7px', display: 'flex', justifyContent: 'center', width: 'max-content', alignItems: 'center', backgroundColor: 'rgba(0, 170, 0, 0.848)', cursor: 'pointer' }} onClick={() => setCurrentId(cell?.row?.original)}>Log Details</span>
      </>
    }
  ]

  const updateDeviceTesting = async (code) => {

    let body = {
      id: parseInt(currentId.id),
      status: 0,
      deviceStatus: eventData?.map((elem) => {
        if(elem?.action !== ''){
          return {
            code: elem?.code.toString(),
            name: elem?.name,
            status: elem?.status,
            action: elem?.action,
            matchText:elem?.matchText
          }
        } else {
          return {
            code: elem?.code.toString(),
            name: elem?.name,
            status: '',
            action: '',
            matchText:elem?.matchText
          }
        }
      })
    }
    
    const response = await updateTestingDeviceStatus(body)

  }

  const finalEventSubmit = async () => {
    let eventStatus = eventData?.filter(item => item?.status == '')
    let body;

    body = {
          id: parseInt(currentId.id),
          status: parseInt(finalStatus),
          deviceStatus: eventData?.map((elem) => {
            return {
              code: elem?.code,
              name: elem?.name,
              status: elem?.status,
              action: elem?.action,
              matchText:elem?.matchText
            }
          })
        }
    
    setLoader(true)
    console.log("apiHittingss",body);
    const apiHitting = await updateTestingDeviceStatus(body)
    console.log("apiHittingss",apiHitting);
    if (apiHitting?.status == true) {
      setLoader(false)
      Swal.fire({
        icon: "success",
        title: "Action Taken Successfully",
        text: apiHitting?.message,
      });
      navigate('/deviceApproval/listDeviceApproval')
    } else {
      setLoader(false)
    }
  }

  console.log(topTableData, "topTableData")
  return (
    <>
      <div className="testing_container">
        {/* Table */}
        {topTableData && <ListTable viewStatus={true} dataList={topTableData} columns={topTableColumn} />}
        {currentId && <div className="testing_details">
          <div style={{width:"100%"}}>
            <DeviceDetailsTable
              currentId = {currentId.imei}
              topTableData = {topTableData}
              dataList={eventData}
              handleStatusChange={handleStatusChange}
              handleActionChange={handleActionChange}
              saveTestEvent = {saveTestEvent}
            />
            <div style={{ display: 'flex', gap: '5px', margin: '10px', backgroundColor: 'gainsboro', padding: '5px 10px', alignItems: 'center' }}>
              <span style={{ width: '50%', fontWeight: '600' }}>Final Status :</span>
              <select onChange={(e) => setFinalStatus(e.target.value)} style={{ width: '25%', padding: '5px', border: '1px solid gainsboro', color: 'rgba(0,0,0,0.8)', outline: 'none', fontWeight: '600' }}>
                <option value="" disabled selected>Select</option>
                <option value="1">OK</option>
                <option value="2">Reject</option>
                <option value="0">Pending</option>
              </select>
              <button onClick={() => finalEventSubmit()} disabled={loader} style={{ width: '20%', height: '100%', border: 'none', padding: '5px 7px', backgroundColor: 'green', color: 'white', cursor: 'pointer' }}>{loader ? "Loading...": "Submit"}</button>
            </div>
          </div>
          {/* <div className="details_container">
            
            <div>
              <button>Click Button For Send Commands</button>
            </div>
            <div className="map_container">
              <MAPLayout/>
            </div>
          </div> */}
        </div>}
      </div>
    </>
  )
}