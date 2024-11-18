import React, { useState, useEffect, useRef } from "react";
import './Components/Table.css'
import '../manufacturers/components/UploadDetaisMNF.css'
import { getManufactureDetailsById, getUsersInMNF } from '../../apis/manufacture.js';
import { BasicDetails } from "./Components/BasicDetails.jsx";
import { UploadKYCDocument } from "./Components/UploadDocuments.jsx";
import { FinalApprovalUpload } from "./Components/FinalApprovalUpload.jsx";
import AddDeviceEmplament from "./Components/AddDeviceEmplament.jsx";
import DeviceCommand from "./Components/DeviceCommand.jsx";
import DDDetailsEmplanment from "./Components/DDDetailsEmplanment.jsx";
import DeviceImagesUpload from "./Components/DeviceImages.jsx";
import DeviceTestingEmplanment from "./Components/DeviceTestingEmplanment.jsx";
import TestingStatus from "./Components/TestingStatus.jsx";
import BankGurantee from "./Components/BankGurantee.jsx";

import { updateStatus } from '../../apis/dashboard.js';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getAddTestingBylist } from "../../apis/deviceInventory.js";
import { getAllApprovedDeviceUser, getDeviceApprovalByEID } from "../../apis/masters.js";
import AddRFCList from "./Components/AddRFCList.jsx";
import { getManufacturerExcelRFCs, getExcelRFCByEID, getManufacturerExcelDSTs, getExcelDSTByEID } from "../../apis/rfcMaster.js";
import AddDSTList from "./Components/AddDSTList.jsx";

export const ManufactureOnboarding = () => {
  
  const location = useLocation();
  const userType = sessionStorage.getItem("userType")
  const manufacturerId = (location.state && location.state.id) || sessionStorage.getItem("entityId")


  const process_flow =[{ id: 1, key: "basic_detail", label: "Details", stage:1},
  { id: 2, key: "kyc_document", label: "KYC Documents", stage:2},
  { id: 3, key: "bank_guarantee", label: "Bank Guarantee", stage:2},
  { id: 4, key: "add_device", label: "Add Device", stage:3},
  { id: 5, key: "dd_details", label: "DD Details", stage:3},
  { id: 6, key: "device_commands", label: "Device Commands", stage:3},
  { id: 7, key: "submit_devices", label: "Testing Devices", stage:3},
  { id: 8, key: "add_dst", label: "Distributor Add", stage:4},
  { id: 9, key: "add_rfc", label: "RFC Centers List", stage:4},
  { id: 10, key: "testing_status", label: "Testing Status", stage:5},
  { id: 11, key: "device_images", label: "Device Images", stage:5},
  { id: 12, key: "acknowledgement_document", label: "Acknowledgement", stage:6},
]
 
  
  const kycDocumentFields = ["gstn", "profile", "company_address", "pan", "director_id", "director_address", "non_blacklisted_certificate", "approach_documentation_device", "quality_certificate","annexures_details", "sop_acceptance", "compliance_evaluation_form", "manufacturing_facility", "backend_licence", "continuaton_licence_cws", "undertaking_uploading_fitted_devices", "undertaking_not_sell_different_product", "data_privacy_undertaking", "affidavit_for_litigation"]

  const [manufacturerData, setManufacturerData] = useState(null);
  const [completedItems, setCompletedItems] = useState(["basic_detail"])
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [panel, setPanel] = useState("basic_detail")
  const [stage, setStage] = useState(0)
  const [uploadedDevice, setUploadedDevice] = useState(null)
  const [testingDeviceList, setTestingDeviceList] = useState([])
  const [uploadedRFCs, setUploadedRFCs] = useState([])
  const [uploadedDSTs, setUploadedDSTs] = useState([])

  // console.log(manufacturerData, uploadedDevice, "manufacturerData")
  console.log(manufacturerData, "manufacturerData")
  
  useEffect(()=>{

    if(uploadedDevice && JSON.parse(uploadedDevice.ddDet) && JSON.parse(uploadedDevice.ddDet)?.ddno){
      setCompletedItems(prevData=>{
        if (!prevData.includes("dd_details"))
          {return [...prevData, "dd_details"]}
        else {
          return prevData
        }
        })
    }
  },[uploadedDevice])


  const getDeviceCommands = async () =>{
    // await fetchApprovalDevices()
    if(uploadedDevice && JSON.parse(uploadedDevice.fileUploadProtocolSpec) && JSON.parse(uploadedDevice.fileUploadProtocolSpec)?.doctype === "device_commands"){
      setCompletedItems(prevData=>{
        if (!prevData.includes("device_commands"))
          {return [...prevData, "device_commands"]}
        else {
          return prevData
        }
        })
    }
  }

  useEffect(()=>{
    getDeviceCommands()
  },[uploadedDevice])


  const fetchApprovalDevices = async () => {
    if (userType === "SBU" || userType === "SUA") {
      
      const response = await getDeviceApprovalByEID(manufacturerData?.id)
      if(response.length>0){
      setUploadedDevice(response[0])
      setCompletedItems(prevData=>{
        if (!prevData.includes("add_device"))
          {return [...prevData, "add_device"]}
        else {
          return prevData
        }
        })
    }

    }

    if (userType === "MNF") {
      const response = await getAllApprovedDeviceUser("mnfOnboarding")
      if(response.length>0){
        setUploadedDevice(response[0])
        setCompletedItems(prevData=>{
          if (!prevData.includes("add_device"))
            {return [...prevData, "add_device"]}
          else {
            return prevData
          }
          })
      }
    }

  }
  

  useEffect(() => {
    if(manufacturerData){fetchApprovalDevices()}
  }, [manufacturerData])


  const fetchRFCs = async () => {
      
    if (userType === "SBU" || userType === "SUA") {
      const response = await getExcelRFCByEID(manufacturerData?.id)
      if(response?.result?.length>0){
      setUploadedRFCs(response?.result)
      setCompletedItems(prevData=>{
        if (!prevData.includes("add_rfc"))
          {return [...prevData, "add_rfc"]}
        else {
          return prevData
        }
        })
      }

    }
    
    if (userType === "MNF") {
      
      const response = await getManufacturerExcelRFCs()
      console.log(response, "getRFCByMNF")
      if(response?.result?.length>0){
        setUploadedRFCs(response?.result)
        setCompletedItems(prevData=>{
          if (!prevData.includes("add_rfc"))
            {return [...prevData, "add_rfc"]}
          else {
            return prevData
          }
          })
      }
    }

  }
  


  useEffect(() => {  
    if(manufacturerData){fetchRFCs()}
  }, [manufacturerData])


  const fetchDSTs = async () => {
      
    if (userType === "SBU" || userType === "SUA") {
      
      const response = await getExcelDSTByEID(manufacturerData?.id)
      
      if(response?.result?.length>0){
      setUploadedDSTs(response?.result)
      setCompletedItems(prevData=>{
        if (!prevData.includes("add_dst"))
          {return [...prevData, "add_dst"]}
        else {
          return prevData
        }
        })
    }

    }
    
    if (userType === "MNF") {
      
      const response = await getManufacturerExcelDSTs()
      console.log(response, "getRFCByMNF")
      if(response?.result?.length>0){
        setUploadedDSTs(response?.result)
        setCompletedItems(prevData=>{
          if (!prevData.includes("add_dst"))
            {return [...prevData, "add_dst"]}
          else {
            return prevData
          }
          })
      }
    }

  }
  


  useEffect(() => {
    
    if(manufacturerData){fetchDSTs()}
  }, [manufacturerData])


  useEffect(()=>{

    // check if KYC documents are upload 
    if (manufacturerData && JSON.parse(manufacturerData.mnfDoc) && JSON.parse(manufacturerData.mnfDoc).length > 0) {
      //const filter = JSON.parse(manufacturerData.mnfDoc).filter(item => {!kycDocumentFields.includes(item?.doctype)})
      const completedDocuments = JSON.parse(manufacturerData.mnfDoc).map(item=>item?.doctype)
      const filter = kycDocumentFields.filter(item => !completedDocuments.includes(item))
      console.log(filter, completedDocuments, "manufacturerDocumentData")
      if(filter.length===0){
        setCompletedItems(prevData=>{
          if (!prevData.includes("kyc_document"))
            {return [...prevData, "kyc_document"]}
          else {
            return prevData
          }
          })
      }
    }

    // check if BG documents are upload 
    if (manufacturerData && JSON.parse(manufacturerData.bgDet) && JSON.parse(manufacturerData.bgDet)?.bgno) {
      
        setCompletedItems(prevData=>{
          if (!prevData.includes("bank_guarantee"))
            {return [...prevData, "bank_guarantee"]}
          else {
            return prevData
          }
          })
      
    }


  }, [manufacturerData])



  const handleEmplanmentStage = async (stage_id) => {
    let stageLabel = "stage"
    let stateID = stage_id

    try {
      const response = await updateStatus(manufacturerData.id, stageLabel, stateID);

      if (response.status && response.message === "Success") {
        await getManufacturerData()
        console.log(response.status)
      } else {
        console.error("Error updating emplanment stage:", response.message);
      }
    } catch (error) {
      console.error("Error updating emplanment stage:", error);
    }
  };


  const getManufacturerData = async () => {
    try {
      setLoading(true);
      const manufacturerDetailsResponse = await getManufactureDetailsById(manufacturerId);
      if (manufacturerDetailsResponse.status) {
        setManufacturerData(prevData => manufacturerDetailsResponse.result[0]);
        console.log(manufacturerDetailsResponse.result[0], "manufacturerDetailsResponse")
        setStage(manufacturerDetailsResponse.result[0].stage || 1)
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getManufacturerData();
  }, []);

  
  const getManufacturerUsers = async () => {
    try {
      setLoading(true);
      const usersListResponse = await getUsersInMNF(manufacturerId);
      if (usersListResponse.status) {
        setUsersList(usersListResponse.result);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getManufacturerUsers();
  }, []);


  useEffect(() => {
    const fetchDeviceTestingDevices = async () => {
        const updatedTopTableData = await getAddTestingBylist(uploadedDevice["modelCode"],);
        
        console.log(updatedTopTableData, "updatedTopTableData")

        if(updatedTopTableData.length>1){
          setTestingDeviceList(updatedTopTableData)
          setCompletedItems(prevData=>{
            if (!prevData.includes("submit_devices"))
              {return [...prevData, "submit_devices"]}
            else {
              return prevData
            }
            })
        }

        if(updatedTopTableData.filter(item=>item.status===1).length>1){
          setCompletedItems(prevData=>{
            if (!prevData.includes("testing_status"))
              {return [...prevData, "testing_status"]}
            else {
              return prevData
            }
            })
        }


        if(updatedTopTableData.length>1){
          let errorFoundImage = false
          for(let item of updatedTopTableData){
            console.log(item, "updatedTopTableDota")
            if(!JSON.parse(item?.deviceImg) && JSON.parse(item?.deviceImg).length<2){
              errorFoundImage=true
              break
            }

            !errorFoundImage && setCompletedItems(prevData=>{
              if (!prevData.includes("device_images"))
                {return [...prevData, "device_images"]}
              else {
                return prevData
              }
              })
          }
          
          
        }
    }

    if(uploadedDevice && uploadedDevice?.modelCode){fetchDeviceTestingDevices()}
  }, [uploadedDevice])


  const changePanel = (key_data) => {
    if (key_data.stage <= stage + 1) {
      setPanel(key_data.key)
    }
  }



  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 7fr', gap: "10px", margin: "10px" }}>
      <div className="onboarding-sequence-container">
        <div>
          <p>Manufacturer Empanelment</p>
        </div><hr />
        {process_flow.map(item => {
          return <div key={item} onClick={() => changePanel(item)} className="onboarding-sequence" style={completedItems.includes(item?.key) ? { backgroundColor: "green", color: "white" } : item.stage === stage + 1 ? { backgroundColor: "orange", color: "white" } : { backgroundColor: "grey", color: "white" }}>{item.label}</div>
        })}
      </div>

      <div>
        {panel === "basic_detail" ? (
          <BasicDetails
            manufacturerData={manufacturerData}
            usersList={usersList}
          />
        ) : null}


        {panel === "kyc_document" ? (
          <UploadKYCDocument
            manufacturerData={manufacturerData}
            setCurrentPanel={setPanel}
            updateManufacturerData = {()=>getManufacturerData()}
            stage = {stage}
          />
        ) : null}
        
        
        

        {panel === "bank_guarantee" ? (
          <BankGurantee
            manufacturerData={manufacturerData}
            setStage={handleEmplanmentStage}
            updateManufacturerData = {()=>getManufacturerData()}
          />
        ) : null}
  


        {panel === "add_device" ? (
          <AddDeviceEmplament
            manufacturerData={manufacturerData}
            
            fetchApprovalDevicesRefresh = {()=>fetchApprovalDevices()}
          />
        ) : null}

        
        {panel === "dd_details" ? (
          <DDDetailsEmplanment
            manufacturerData={manufacturerData}
            updateManufacturerData = {()=>getManufacturerData()}
          />
        ) : null} 


        {panel === "device_commands" ? (
          <DeviceCommand
            manufacturerData={manufacturerData}
            getDeviceCommands = {()=>getDeviceCommands()}
          />
        ) : null}


        {panel === "submit_devices" ? (
          <DeviceTestingEmplanment
            manufacturerData={manufacturerData}
            uploadedDevice = {uploadedDevice}
            setStage={(item)=>handleEmplanmentStage(item)}  
          />
        ) : null}

        
        
        
        {panel === "add_dst" ? (
          <AddDSTList
            dstList={uploadedDSTs}
            fetchDSTs={()=>fetchDSTs()}
            updateManufacturerData = {()=>getManufacturerData()}
            mnfData = {manufacturerData}
            modelCode = {uploadedDevice.modelCode}
          />
        ) : null}
          


        {panel === "add_rfc" ? (
          <AddRFCList
            rfcList={uploadedRFCs}
            updateManufacturerData = {()=>getManufacturerData()}
            setStage={handleEmplanmentStage}
          />
        ) : null}


        {panel === "testing_status" ? (
          <TestingStatus
            manufacturerData={manufacturerData}
            setStage={handleEmplanmentStage}
            usersList={usersList}
            setCompletedItems={setCompletedItems}
          />
        ) : null}

        {panel === "device_images" ? (
          <DeviceImagesUpload
            manufacturerData={manufacturerData}
            setCurrentPanel={setPanel}
            testingDeviceList={testingDeviceList}
            setStage={handleEmplanmentStage}
            uploadedDevice = {uploadedDevice}
            usersList={usersList}
          />
        ) : null}
        

        {panel === "acknowledgement_document" ? (
          <FinalApprovalUpload
            manufacturerData={manufacturerData}
            setStage={handleEmplanmentStage}
          />
        ) : null}


      </div>
    </div>
  )
};
