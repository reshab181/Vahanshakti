import React, { useState, useRef, useEffect } from 'react';
import { FcApproval } from 'react-icons/fc';
import { FaUpload } from 'react-icons/fa';
import '../../manufacturers/components/UploadDetaisMNF.css'
import '../../deviceApproval/components/uploadDocument.css'
import ExcelDownloadButton from '../../../components/ExcelButton';
import { fetchPresignedURL, updateStatus } from '../../../apis/dashboard';
import { FaEye } from "react-icons/fa";
import { getAllApprovedDeviceUser, getDeviceApprovalByEID, uploadDocDeviceApproval } from '../../../apis/masters';
import { uploadDoc } from '../../../apis/deviceInventory';
import readXlsxFile from "read-excel-file";
import ListTable from '../../../components/Common/Listtable/ListTable';
import Swal from "sweetalert2";
import { getDocumentFullUrl } from '../../../apis/manufacture';

const DeviceCommand = ({manufacturerData, getDeviceCommands}) => {

  const userType = sessionStorage.getItem("userType")
  
  const [uploadedCommands, setUploadedCommands] = useState([]);
    const availableCommands = [
      "Set primary IP port",
      "Set Secondary IP Port",
      "Set Tertiary IP Port",
      "Get Configuration", 
      "Set Frequence of Packets", 
      "Get firmware Version", 
      "Set Overspeed Limit", 
      "Get WhiteListed IPs", 
      "Get Geofence", 
      "Get SOS Status", 
      "Clear SOS", 
      "Clear Memory", 
      "Reboot Command", 
      "Clear Geofence", 
      "Set Geofence", 
      "Get Live Location", 
      "Get Health", 
      "FOTA Details", 
      "Get Overspeed Limit", 
      "Set Vehicle Number", 
      "Get Vehicle Number"
    ];

  const [loading, setLoading] = useState(false);
  const [docnameURL, setDocname] = useState('') 
  const [errorArray, setErrorArray] = useState([]);
  const [bulkUpload, setBulkUpload] = useState([]);
  const [uploadedModelCode, setUploadedModelCode] = useState('')
  const [showDocumentFeild, setShowDocumentFeild] = useState('')
  const [presignedUrl, setPresignedUrl] = useState(null);
  const uploadButtonRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(()=>{
    const fetchApprovalDevices = async () => {

      if(userType==="SBU" || userType==="SUA"){
          const response = await getDeviceApprovalByEID(manufacturerData?.id)
          setDocname(JSON.parse(response[0].fileUploadProtocolSpec).docname)
          console.log(showDocumentFeild);
          response[0].fileUploadProtocolSpec ==  null ? null:  setShowDocumentFeild(JSON.parse(response[0].fileUploadProtocolSpec))
        }

      if(userType==="MNF"){
        const response = await getAllApprovedDeviceUser()
        setUploadedModelCode(response[0].modelCode)
        console.log(uploadedModelCode);
        console.log(response, "fetched Device from MNF")
        console.log(JSON.parse(response[0].fileUploadProtocolSpec), "fetched Device from State Backedn")
        setDocname(JSON.parse(response[0].fileUploadProtocolSpec).docname)
        response[0].fileUploadProtocolSpec ==  null ? null:  setShowDocumentFeild(JSON.parse(response[0].fileUploadProtocolSpec))
        console.log(showDocumentFeild);
      }  

      }
    fetchApprovalDevices()
  },[])

  useEffect(() => {
    if (presignedUrl) {
      window.open(presignedUrl, "_blank");
      // Reset the presignedUrl state after opening the document
      setPresignedUrl(null);
    }
  }, [presignedUrl]);

  
  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = async(e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

      if (!allowedTypes.includes(file.type)) {
        alert('Only Excel files are allowed.');
        // Clear the input field
        e.target.value = '';
        return;
      }

      const rows = await readXlsxFile(file);
      console.log("Rows read from file:", rows[0]);

      if (rows.length === 0 || rows[0].length === 0) {
        // setIsLoading(false);
        console.error("Empty file or invalid format");
        return;
      }
      const headerRow = rows[0];
      const requiredHeaders = [
        "Command Title",
        "Command Text For SMS",
        "Command Text for Stream",
        // "vltdModelCode",
        // "esim_provider",
      ];
      const missingHeaders = requiredHeaders.filter(
        (header) => !headerRow.includes(header)
      );
      if (missingHeaders.length > 0) {
        setErrorArray([
          ...missingHeaders.map((header, index) => `${header}, `),
        ]);
        // setIsLoading(false);
        console.error("Missing headers:", missingHeaders);
        return;
      }
      setErrorArray([]);
      
      const bulkData = rows.slice(1).map((row) => {
        console.log("ErrorFound73673", row[2])
        if(!row[2] || !row[3]){
          console.log("ErrorFound7367", row[2])
          setErrorArray(prev=>{return [...prev, `${row[1]} is missing`]})
        }
        return {
          "Sr NO":String(row[0] || ""),
          "Command Title": String(row[1] || ""),
          "Command Text For SMS": String(row[2] || ""),
          "Command Text for Stream": String(row[3] || ""),
        };
        
      });

      console.log("BulkDataExtracted", errorArray);

      if(errorArray?.length === 0){
      setBulkUpload(bulkData);
      setUploadedCommands([{ fileName: file.name, size: file.size }]);
      console.log(uploadedCommands);
      }
    }
  };

  const handleSave = async(e) => {
    e.preventDefault();
    
    try {
      setLoading(true); 

      const file = fileInputRef.current.files[0];
      console.log(file);

      if (!file) {
        console.error('No file selected.');
        return;
      }

      const responseDeviceApproval = await uploadDocDeviceApproval(file);
      console.log(responseDeviceApproval, "responseDeviceApproval 123");

      if (responseDeviceApproval.status) {
        console.log('Document uploaded successfully:', responseDeviceApproval);
        let docData = {
          docname: responseDeviceApproval.filename,
          doctype: 'device_commands'
        };
        var updatedInitialData = {
          model_code: uploadedModelCode,
          protocol_spec: docData
        };

        console.log(updatedInitialData, "abc");

        const responseUploadDoc = await uploadDoc(updatedInitialData);

        console.log(responseUploadDoc, "responseUploadDoc 123");

        if (responseUploadDoc.status) {
          console.log('Second document uploaded successfully:', responseUploadDoc);
          Swal.fire({
            icon: "success",
            title: "Device Commands Uploaded",
            text: `Please complete rest of the onboarding process`,
          });
          const response = await getAllApprovedDeviceUser()
          setUploadedModelCode(response[0].modelCode)
          setDocname(JSON.parse(response[0].fileUploadProtocolSpec).docname)
          setShowDocumentFeild(JSON.parse(response[0].fileUploadProtocolSpec))
          await getDeviceCommands()
        } else {
          Swal.fire({
            icon: "error",
            title: "Something Went Wrong!",
            text: ``,
          });
          console.error('Error uploading second document:', responseUploadDoc.error);
        }
      } else {
        console.error('Error uploading document:', responseDeviceApproval.error);
      }
    } catch (error) {
      console.error('An error occurred while uploading the document:', error);
    } finally {
      setLoading(false); // Reset loading state after the process is complete
    }  
  }

  
  const getFileUrl = async (docname) => {
    const fileUrl = await getDocumentFullUrl(docname)
    return fileUrl;
  }

  const column = [
    
    {
      Header: "Functionality",
      accessor: "Command Title",
      Cell: ({ cell }) => (cell?.row?.original?.["Command Title"] || "")
    },
    {
      Header: "SMS Command",
      accessor: "Command Text For SMS",
      Cell: ({ cell }) => (cell?.row?.original?.["Command Text For SMS"] || "")
    },
    {
      Header: "Server Command",
      accessor: "Command Text for Stream",
      Cell: ({ cell }) => (cell?.row?.original?.["Command Text for Stream"] || "")
    }
  ]
  console.log(uploadedCommands, "uploadedCommands")
  return (
    <>
    <p className='emplament-heading'>Upload Device Commands</p>
    {showDocumentFeild  || !showDocumentFeild.docname == '' ? 
      <div>
        <div className="uplode-document-dd-item">
          <div className="upload-document-box" style={{height:"150px"}}>
            <h3>Uploded Documents</h3>
            <p>{docnameURL}</p>
            
              <button style={{ border: "none", outline: "none", background: "none", color: "blue", cursor: "pointer" }} onClick={async () => window.open(await getFileUrl(docnameURL), '_blank')}>Download</button>
            
          </div>
        </div>
      </div> :       
      userType === "MNF" ? <div>
        <div style={{backgroundColor:"white", padding:"20px"}}>

          <div>
              {uploadedCommands.length === 0 && <div className="" style={{display:"flex", marginTop:"17px", justifyContent:"center"}}>
                <ExcelDownloadButton
                  headerData={availableCommands.map((item,index)=>{
                    return {
                      "Sno":index+1,
                      "Command Title": item,
                      "Command Text For SMS": "",
                      "Command Text for Stream": "",  
                    }
                  })}
                  fileName = "DeviceCommandsRequired"
                />
              </div>}
              {uploadedCommands.length === 0 ? (
                <>
                  <h3 style={{textAlign:'center'}}>No Document Found!</h3>
                  <p  style={{textAlign:'center'}}>Upload Excel Document Here</p>
                  <div style={{display:"flex", justifyContent:'center', marginBottom:"15px"}}>
                    <button className="upload-button" ref={uploadButtonRef} onClick={handleUpload}>
                      <FaUpload /> Upload Document
                    </button>
                  </div>
                  {errorArray?.length > 0 && <p style={{ fontWeight: '600', color: 'red' }}>Missing Headers: {errorArray}</p>}
                </>
              ) : (
                <>
                <h3>Your Document is Uploded</h3>
                  {errorArray.length===0 ? <div className="table-list">
                    <ListTable dataList={bulkUpload} columns={column} />
                  </div>:errorArray.map(item=><p key={item} style={{padding:"3px", color:"red"}}>{item}</p>)}
                <div>
                  <button className="reset-button" onClick={() => {setUploadedCommands([]), setErrorArray([])}} style={{marginBottom:"20px"}}>
                    Reset
                  </button>
                </div>
              </>
                )}
              <div className="">
                <input type="file" className="file-input" ref={fileInputRef} onChange={handleFileInputChange} accept=".xls, .xlsx, .csv" />
              </div>
          </div>

          {errorArray.length===0 && <div className="upload-document-right">
            <p>Commands required to be uploaded</p>

            <div style={{display:"flex", flexWrap:"wrap"}}>
              {availableCommands.map((cmd, index) => (
                <div style={{minWidth:"220px"}} key={index}>
                  <FcApproval className="approval-icon" />
                  <span style={{ fontWeight: 'bold', fontSize: "12px" }}>{cmd}</span>
                </div>
              ))}
            </div>
          </div>}

        </div>
      </div> :   <div style={{display: "flex", justifyContent:"center", backgroundColor:"white", padding:"20px"}}><p style={{color:"red"}}><b>No Device Commands Details Uploaded Yet!!</b></p></div>
      }
  
      {userType === "MNF" && !showDocumentFeild && <div className="saveNextEmplamentButtonDevice">
          <button onClick={handleSave}>Upload</button>
      </div>}
      
    </>
  );
};

export default DeviceCommand