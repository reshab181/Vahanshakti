
import { useState, useEffect } from "react";
import { LoadingWidget } from "../../components/loading";
import { getAllApprovedDeviceUser} from "../../apis/masters";
import {DdDetails} from "./components/DdDetails";
import {UploadCommand} from "./components/UploadDocument";
import ListTable from "../../components/Common/Listtable/ListTable"
import {DeviceTesting} from "./components/DeviceTesting";
import './components/deviceApproval.css'
import { AddDeviceApprovalComponent } from "./components/addDeviceComponent";
import './components/deviceApproval.css'
import { updateStatus } from "../../apis/dashboard";
import { getApprovalDevice } from "../../apis/deviceInventory";
import TestingStatusApproval from "./components/TestingStatusApproval";
import DeviceImagesUploadDeviceApproval from "./components/testingDeviceImages";

export const AddDeviceApproval = () => {
    
    const [uploadedPendingDevices, setUploadedPendingDevices] = useState(null)
    const [selectedDevice, setSelectedDevice] = useState(null)
    const [addDevicePanel, setAddDevicePanel] = useState(false)
    const [panel, setPanel] = useState("add_device")

    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState('')
    const [color1, setColor1] = useState('')
    const [color2, setColor2] = useState('')
    const [color3, setColor3] = useState('')
    const [color4, setColor4] = useState('')
    const [color5, setColor5] = useState('')
    const [stage, setStage] = useState(0)
    
    const userType = sessionStorage.getItem("userType");
    
    const process_flow = [
                          {id:1, key: "add_device", label: "Add Device",stage : 1 },
                          {id:2, key: "dd_details", label: "DD Details",stage : 2 },
                          {id:3, key: "device_commands", label: "Device Commands",stage : 3 },
                          {id:4, key: "submit_devices", label: "Testing Devices",stage : 4 },
                          {id:5, key: "device_images", label: "Device Images",stage : 5 },
                          {id:6, key: "testing_status", label: "Testing Status",stage : 6 },
                        ]
                        

    useEffect(()=>{
      const fetchApprovalDevices = async () => {
        setLoading(true)
          const response = await getAllApprovedDeviceUser()
          const unapprovedDevices = response.filter(item=>item["approvalstatusbysb"] === 0)
          setUploadedPendingDevices(unapprovedDevices)
          setLoading(false)
        }
      fetchApprovalDevices()
    },[])
    
    const updateSelectedDeviceDetail = async (modelCodeData) => {
      console.log(modelCodeData);
      const response = await getApprovalDevice(modelCodeData)
      setSelectedDevice(response)
      console.log(response)
    }

    const column = [
      {
        Header: "modelCode ",
        accessor: "modelCode",
        Cell: ({ cell }) => <>
          <div onClick={() => setSelectedDevice(cell?.row?.original)} style={{ display: 'flex', gap: '5px', alignContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
            <span style={{color: '#42a4f5'}}>{cell?.row?.original?.modelCode}</span>
          </div>
        </>
      },
      {
        Header: "modelName",
        accessor: "modelName",
        Cell: ({ cell }) => (cell.row.original?.modelName || "N/A")
      },
      {
        Header: "certifyingAuthority",
        accessor: "certifyingAuthority",
        Cell: ({ cell }) => (cell.row.original?.certifyingAuthority || "N/A")
      },
      {
        Header: "tacCertificateNo",
        accessor: "tacCertificateNo",
        Cell: ({ cell }) => (cell.row.original?.tacCertificateNo || "N/A")
      },
      {
        Header: "copCertificateNo",
        accessor: "copCertificateNo",
        Cell: ({ cell }) => (cell.row.original?.copCertificateNo || "N/A")
      },
      {
        Header: "Status",
        accessor: 'approvalstatusbysb',
        Cell: ({ cell }) => (<>
  
          {
            cell?.row?.original?.approvalstatusbysb == '1' &&
            <span style={{ color: 'white', padding: '5px 7px', display: 'flex', justifyContent: 'center', width: 'max-content', alignItems: 'center', backgroundColor: 'green' }}>Approved</span>
          }
  
          {
            cell?.row?.original?.approvalstatusbysb == '2' &&
            <span style={{ color: 'white', padding: '5px 7px', display: 'flex', justifyContent: 'center', width: 'max-content', alignItems: 'center', backgroundColor: 'rgba(255, 0, 0, 0.8)' }}>Rejected</span>
          }
  
          {
            (['MNF', 'DST']?.includes(userType) && cell?.row?.original?.approvalstatusbysb == '0') &&
            <span style={{ color: 'black', display: 'flex', justifyContent: 'center', width: 'max-content', alignItems: 'center' }}>Pending</span>
          }
  
  
        </>),
   
      }
    ]
  

    return (
        <div className="device-approval-wrapper">
          {addDevicePanel || selectedDevice ? <div style={{ display: 'grid', gridTemplateColumns: '2fr 7fr', gap: "10px", margin: "10px" }}>
            <div className="process-flow-device">
              {process_flow.map(item => {
              return (
                <div key={item} onClick={() => setPanel(item.key)} className={` ${panel === item.key ? 'active-state' : (color === 'enabledd' ? 'enabledd' : 'disabledd')}`}  style={item.stage <= stage ? { backgroundColor: "green", color: "white" } : item.stage === stage + 1 ? { backgroundColor: "orange", color: "white" } : { backgroundColor: "grey", color: "white" }}>
                  {item.label}
                </div>
              );
              })}
              {/* <div onClick={() => setPanel("add_device")} className={` ${panel === "add_device" ? 'active-state' : (color === 'enabledd' ? 'enabledd' : 'disabledd')}`} style={0 <= stage ? { backgroundColor: "green", color: "white" } : 0 === stage + 1 ? { backgroundColor: "orange", color: "white" } : { backgroundColor: "grey", color: "white" }}>
              Add Device
              </div>
              <div onClick={() => setPanel("dd_details")} className={` ${panel === "dd_details" ? 'active-state' : (color1 === 'enabledd' ? 'enabledd' : 'disabledd')}`} style={1 <= stage ? { backgroundColor: "green", color: "white" } : 1 === stage + 1 ? { backgroundColor: "orange", color: "white" } : { backgroundColor: "grey", color: "white" }}>
              DD Details
              </div>
              <div onClick={() => setPanel("device_commands")} className={` ${panel === "device_commands" ? 'active-state' : (color2 === 'enabledd' ? 'enabledd' : 'disabledd')}`} style={2 <= stage ? { backgroundColor: "green", color: "white" } : 2 === stage + 1 ? { backgroundColor: "orange", color: "white" } : { backgroundColor: "grey", color: "white" }}>
              Device Commands
              </div>
              <div onClick={() => setPanel("submit_devices")} className={` ${panel === "submit_devices" ? 'active-state' : (color3 === 'enabledd' ? 'enabledd' : 'disabledd')}`} style={3 <= stage ? { backgroundColor: "green", color: "white" } : 3 === stage + 1 ? { backgroundColor: "orange", color: "white" } : { backgroundColor: "grey", color: "white" }}>
              Testing Devices
              </div>
              <div onClick={() => setPanel("device_images")} className={` ${panel === "device_images" ? 'active-state' : (color4 === 'enabledd' ? 'enabledd' : 'disabledd')}`} style={4 <= stage ? { backgroundColor: "green", color: "white" } : 4 === stage + 1 ? { backgroundColor: "orange", color: "white" } : { backgroundColor: "grey", color: "white" }}>
              Device Images
              </div>
              <div onClick={() => setPanel("testing_status")} className={` ${panel === "testing_status" ? 'active-state' : (color5 === 'enabledd' ? 'enabledd' : 'disabledd')}`} style={5 <= stage ? { backgroundColor: "green", color: "white" } : 5 === stage + 1 ? { backgroundColor: "orange", color: "white" } : { backgroundColor: "grey", color: "white" }}>
              Testing Status
              </div> */}
            </div>
            <div>
              {
                panel === "add_device" ? 
                  <AddDeviceApprovalComponent 
                    uploadedDeviceDetail = {selectedDevice} 
                    setSelectedDevice = {setSelectedDevice}
                    refreshDeviceDetail={updateSelectedDeviceDetail} 
                    setCurrentPanel={setPanel} 
                    setColor = {setColor}
                    
                  /> : null
              }
              {
                panel === "dd_details" ? 
                  <DdDetails 
                    uploadedDeviceDetail = {selectedDevice}
                    setSelectedDevice = {setSelectedDevice} 
                    refreshDeviceDetail={updateSelectedDeviceDetail} 
                    setCurrentPanel={setPanel}
                    setColor = {setColor1}
                  /> : null
              } 
              {
                panel === "device_commands" ? 
                  <UploadCommand 
                    uploadedDeviceDetail = {selectedDevice} 
                    refreshDeviceDetail={updateSelectedDeviceDetail} 
                    setCurrentPanel={setPanel}
                    setColor = {setColor2}
                  />:null
              } 
              {
                panel === "submit_devices" ?  
                  <DeviceTesting 
                    uploadedDeviceDetail = {selectedDevice} 
                    refreshDeviceDetail={updateSelectedDeviceDetail} 
                    setCurrentPanel={setPanel}
                    setColor = {setColor3}
                  /> : null
              }                 
              {
                panel === "device_images" ?
                  <DeviceImagesUploadDeviceApproval 
                    uploadedDeviceDetail = {selectedDevice} 
                    refreshDeviceDetail={updateSelectedDeviceDetail} 
                    setCurrentPanel={setPanel}
                    setColor = {setColor4}
                  /> : null
              }
              {
                panel === "testing_status" ?  
                  <TestingStatusApproval 
                    uploadedDeviceDetail = {selectedDevice} 
                    refreshDeviceDetail={updateSelectedDeviceDetail} 
                    setCurrentPanel={setPanel}
                    setColor = {setColor5}
                  /> : null
              }
            </div>    
          
          </div> : loading ? <LoadingWidget/> : (uploadedPendingDevices && uploadedPendingDevices.length > 0 ? 
                    <div style={{marginBottom:"10px"}}>
                      <div className="device-approval-btn-add">
                        <button onClick={()=>setAddDevicePanel(true)}>Add Device</button>
                      </div>
                      <p  className="form-heading-para" style={{margin:"10px 0 5px 10px"}}>Pending Devices</p>
                      <ListTable 
                      dataList={uploadedPendingDevices}
                      columns={column}
                      />
                    </div> : <div>
                        <p>No Device Pending for Approval</p>
                        <div className="device-approval-btn-add">
                          <button  onClick={()=>setAddDevicePanel(true)}>Add Device</button>
                        </div>
                      </div>)
              }
          
        </div>
    )
}
