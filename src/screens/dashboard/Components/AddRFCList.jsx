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
import { uploadBulkRFCExcelList } from '../../../apis/rfcMaster';

const AddRFCList = ({rfcList, setStage}) => {

  const userType = sessionStorage.getItem("userType")
    
  const [uploadedRFCList, setUploadedRFCList] = useState(rfcList);
  const [errorArray, setErrorArray] = useState([]);
  const [presignedUrl, setPresignedUrl] = useState(null);
  const uploadButtonRef = useRef(null);
  const fileInputRef = useRef(null);

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
      const requiredHeaders = ["rfcName", "mnfName", "deviceModel", "name", "email", "mobile", "address"];
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
          "rfcName": String(row[0] || ""),
          "mnfName":String(row[1] || ""),
          "deviceModel":String(row[2] || ""),
          "name":String(row[3] || ""),
          "email":String(row[4] || ""),
          "mobile":String(row[5] || ""),
          "address":String(row[6] || ""),
          "city":String(row[7] || ""),
          "district":String(row[8] || ""),
          "state":String(row[9] || ""),
          "pin":String(row[10] || ""),
          "type":"RFC",
        };
        
      });
      
      setUploadedRFCList(bulkData);      
    }
  };

  const handleSave = async(e) => {
    e.preventDefault();
    try {
      const response = await uploadBulkRFCExcelList(uploadedRFCList);
      let data = response?.filter(item => item?.status == false)

      if (data.length===0) {
        Swal.fire({
          icon: 'success',
          title: '',
          text: 'All Retro Fitment Centers added successfully.'
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: '',
          text: `${data?.map((elem) => elem?.message + ",   ")}`
        })
      }

      console.log("Bulk Upload Response: ", response);

      setUploadedRFCList([])

    } catch (error) {
      console.error(error.message);
    }
  }

  
  const getFileUrl = async (docname) => {
    const fileUrl = await getDocumentFullUrl(docname)
    return fileUrl;
  }

  
  const column = [
    
    {
      Header: "RFC Name",
      accessor: "rfcName",
      Cell: ({ cell }) => (cell?.row?.original?.rfcName || "N/A")
    },
    {
      Header: "Manufacturer Name",
      accessor: "mnfName",
      Cell: ({ cell }) => (cell?.row?.original?.mnfName || "N/A")
    },
    {
      Header: "Device Model",
      accessor: "deviceModel",
      Cell: ({ cell }) => (cell?.row?.original?.deviceModel || "N/A")
    },
    {
      Header: "POC Name",
      accessor: "name",
      Cell: ({ cell }) => (cell?.row?.original?.name || "N/A")
    },
    {
      Header: "EMail ID",
      accessor: "email",
      Cell: ({ cell }) => (cell?.row?.original?.email || "N/A")
    },
    {
      Header: "Mobile",
      accessor: "mobile",
      Cell: ({ cell }) => (cell?.row?.original?.mobile || "N/A")
    },
    {
      Header: "Address",
      accessor: "address",
      Cell: ({ cell }) => (cell?.row?.original?.address || "N/A")
    },
    {
      Header: "City",
      accessor: "city",
      Cell: ({ cell }) => (cell?.row?.original?.city || "N/A")
    },
    {
      Header: "District",
      accessor: "district",
      Cell: ({ cell }) => (cell?.row?.original?.district || "N/A")
    },
    {
      Header: "State",
      accessor: "state",
      Cell: ({ cell }) => (cell?.row?.original?.state || "N/A")
    },
    {
      Header: "Pn Code",
      accessor: "pin",
      Cell: ({ cell }) => (cell?.row?.original?.pin || "N/A")
    },
    
  ]

  console.log(uploadBulkRFCExcelList)
  return (
    <>
    <p className='emplament-heading'>Retro Fitment Center Details</p>
      <div style={{display: "flex", justifyContent:"center", backgroundColor:"white", padding:"20px"}}>
        {uploadedRFCList.length === 0 && userType==="MNF" ? <div>
          <div>
                <div style={{maxWidth:"750px", margin:"2px auto", padding:"2px auto"}}>
                  
                  <div className="" style={{marginTop:"17px", display:"flex", justifyContent:"space-between", gap:"10px", alignItems:"center"}}>
                  <h3 style={{textAlign:"center"}}>No Document Found!</h3>
                    <ExcelDownloadButton
                      headerData={[{
                        "rfcName": "ABC Fitment Pvt Limited",
                        "mnfName": "MNF Pvt Limited",
                        "deviceModel":"AISD140",
                        "name": "Abcdef Huioo",
                        "email": "abcdef.huioo@abc.com",
                        "mobile": "8998822333",
                        "address": "Survey No 1, Brigade Road",
                        "city":"Mumbai",
                        "district":"Andheri",
                        "state":"Maharashtra",
                        "pin":"110085"
                        
                        }]}
                      
                        
                      fileName = "RFC_Details_Format"
                    />
                  </div>
                  <div style={{display:"flex", justifyContent:"space-between", gap:"10px", alignItems:"center", margin:"17px auto"}}>
                    <p>Upload Excel Document Here</p>
                    <button className="upload-button" ref={uploadButtonRef} onClick={handleUpload}>
                      <FaUpload /> Upload Document
                    </button>
                  </div>
                  {errorArray?.length > 0 && <span style={{ fontWeight: '600', color: 'red' }}>Missing Headers: {errorArray}</span>}
                </div>
              
                {uploadedRFCList.length>0 && <>
                  <h3>Your Document is Uploded</h3>
                  <div className="table-list">
                    <ListTable dataList={uploadedRFCList} columns={column} />
                  </div>
                  <div>
                    <button  onClick={() => setUploadedRFCList(prevData=>{return []})} style={{margin:"10px auto", background:"red", color:"white", border:"1px red", padding:"4px 8px", borderRadius:"4px"}}>
                      Reset
                    </button>
                  </div>
                </>}
                
              <div className="">
                <input type="file" className="file-input" ref={fileInputRef} onChange={handleFileInputChange} accept=".xls, .xlsx, .csv" />
              </div>
          </div>
        </div>: uploadedRFCList.length === 0 && userType!=="MNF" ? 
                <div style={{display: "flex", justifyContent:"center", backgroundColor:"white", padding:"20px"}}><p style={{color:"red"}}><b>No RFC Details Uploaded Yet!!</b></p></div>
                : <div className="table-list">
                  {uploadedRFCList.length>0 && <ListTable dataList={uploadedRFCList} columns={column} />}
                </div>}
      </div>
    
  
      {userType === "MNF" ? <div className="saveNextEmplamentButton">
          <button onClick={handleSave}>Upload</button>
      </div> : null}

      {userType === "SBU"  ? <div className='saveNextEmplamentButton'>
              <button  onClick={(e)=>setStage(4)}>Approve for next stage</button>
          </div> : null}

      
    </>
  );
};

export default AddRFCList