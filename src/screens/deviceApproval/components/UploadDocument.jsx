import React, { useState, useRef, useEffect } from 'react';
import { FcApproval } from 'react-icons/fc';
import { FaUpload } from 'react-icons/fa';
import { getApprovalDevice, uploadDoc } from '../../../apis/deviceInventory';
import { uploadDocDeviceApproval } from "../../../apis/masters";
import './uploadDocument.css'
import ExcelDownloadButton from '../../../components/ExcelButton';
import readXlsxFile from "read-excel-file";
import Swal from "sweetalert2";
import { getDocumentFullUrl } from '../../../apis/manufacture';


export const UploadCommand = ({uploadedDeviceDetail=null,refreshDeviceDetail,setCurrentPanel,setColor2}) => {
  // console.log(uploadedDeviceDetail, "uploaded device detail")
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
      "Arefence details", 
      "Get SOS status", 
      "Clear SOS", 
      "Clear memory", 
      "Reboot command", 
      "Clear areafence", 
      "Set areafence", 
      "Get live location", 
      "Get health", 
      "FOTA details", 
      "Get Overspeed Limit", 
      "Set Vehicle Number", 
      "Get Vehicle Number"
    ];

  const [loading, setLoading] = useState(false);
  const [docnameURL, setDocname] = useState('') 
  const [errorArray, setErrorArray] = useState([]);
  const [bulkUpload, setBulkUpload] = useState([]);
  const [showDocumentFeild, setShowDocumentFeild] = useState('')
  // const [uploadedDeviceDetail, setUploadedDeviceDetail] = useState([])
  const uploadButtonRef = useRef(null);
  const fileInputRef = useRef(null);

  let model_code = sessionStorage.getItem("model_code")

  useEffect(()=>{
    const fetchDevice = async() => {
      const res = await getApprovalDevice(model_code)
      // setUploadedDeviceDetail(res)
      console.log(res);
    }
    fetchDevice();
  },[])

  useEffect(()=>{
          setDocname(JSON.parse(uploadedDeviceDetail.fileUploadProtocolSpec)?.docname)
          console.log(showDocumentFeild);
          uploadedDeviceDetail.fileUploadProtocolSpec ==  null ? null:  setShowDocumentFeild(JSON.parse(uploadedDeviceDetail.fileUploadProtocolSpec))
          console.log(showDocumentFeild);
  },[])

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
        return {
          "Sr NO":String(row[0] || ""),
          "Command Title": String(row[1] || ""),
          "Command Text For SMS": String(row[2] || ""),
          "Command Text for Stream": String(row[3] || ""),
        };
        
      });

      console.log("Bulk data extracted:", bulkData);

      setBulkUpload(bulkData);
      setUploadedCommands([{ fileName: file.name, size: file.size }]);
      console.log(uploadedCommands);
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
          model_code: uploadedDeviceDetail?.modelCode,
          protocol_spec: docData
        };

        console.log(updatedInitialData, "abc");

        const responseUploadDoc = await uploadDoc(updatedInitialData);

        console.log(responseUploadDoc, "responseUploadDoc 123");

        if (responseUploadDoc.status) {
          console.log('Second document uploaded successfully:', responseUploadDoc);
          Swal.fire({
            icon: "success",
            title: "DD Status! Uploaded",
            text: `Success.`,
          });
          refreshDeviceDetail(model_code)
          setCurrentPanel("submit_devices")
          setColor2("enabledd")
        } else {
          console.error('Error uploading second document:', responseUploadDoc.error);
        }
      } else {
        console.error('Error uploading document:', responseDeviceApproval.error);
      }
    } catch (error) {
      console.error('An error occurred while uploading the document:', error);
    } finally {
      setLoading(false); 
    }  
  }

  const getFileUrl = async (docname) => {
    const fileUrl = await getDocumentFullUrl(docname)
    return fileUrl;
  }

  return (
    <>
    <p className='emplament-heading'>Upload Device Commands</p>
    {showDocumentFeild  || !showDocumentFeild.docname == '' ? 
      <div>
        <div className="uplode-document-dd-item">
          <div className="upload-document-box" style={{height:"150px"}}>
            <h3>Uploded Documents</h3>
            <p>{docnameURL}</p>
            
              {/* <FaEye style={{ marginRight: "5px", backgroundColor: "blue", borderRadius: "50%", padding: "5px", color: "white" }} /> */}
              <button style={{border:"none",outline:"none",background:"none",color:"blue",cursor:"pointer"}} onClick={async () => window.open(await getFileUrl(docnameURL), '_blank')} >Download</button>
            {/* </a> */}
          </div>
        </div>
      </div> :       
      <div>
        <div className="uplode-document-dd-item">

          <div className="upload-document-box">
          <div className="" style={{marginTop:"17px"}}>
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
              </div>
              {uploadedCommands.length === 0 ? (
                <>
                  <h3>No Document Found!</h3>
                  <p>Upload Excel Document Here</p>
                  <button className="upload-button" ref={uploadButtonRef} onClick={handleUpload}>
                    <FaUpload /> Upload Document
                  </button>
                  {errorArray?.length > 0 && <span style={{ fontWeight: '600', color: 'red' }}>Missing Headers: {errorArray}</span>}
                </>
              ) : (
                <>
                <h3>Your Document is Uploded</h3>
                <div className="table-list">
                <table>
                <thead>
                  <tr>
                    <th>Command Title</th>
                    <th>Command Text For SMS</th>
                    <th>Command Text for Stream</th>
                  </tr>
                </thead>
                <tbody>
                  {bulkUpload.map((rowData, index) => (
                    <tr key={index}>
                      <td>{rowData["Command Title"]}</td>
                      <td>{rowData["Command Text For SMS"]}</td>
                      <td>{rowData["Command Text for Stream"]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
                </div>
                <div>
                  <button className="reset-button" onClick={() => setUploadedCommands([])} style={{marginBottom:"20px"}}>
                    Reset
                  </button>
                </div>
              </>
                )}
              <div className="">
                <input type="file" className="file-input" ref={fileInputRef} onChange={handleFileInputChange} accept=".xls, .xlsx, .csv" />
              </div>
          </div>

          <div className="upload-document-right">
            <p>Commands required to be uploaded</p>

            <div style={{display:"flex", flexWrap:"wrap"}}>
              {availableCommands.map((cmd, index) => (
                <div style={{minWidth:"220px"}} key={index}>
                  <FcApproval className="approval-icon" />
                  <span style={{ fontWeight: 'bold', fontSize: "12px" }}>{cmd}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      }
  
      <div className="saveNextEmplamentButton">
          <button onClick={handleSave}>Upload</button>
      </div>

    </>
  );
};

