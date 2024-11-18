import React, { useState, useEffect } from "react";
import './Table.css'
import '../../manufacturers/components/UploadDetaisMNF.css'
import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { uploadDocumentMNFRegister } from '../../../apis/dashboard.js';
import { getDocumentFullUrl } from "../../../apis/manufacture.js";
import { GrCloudUpload } from "react-icons/gr";
import { FiCheckCircle } from "react-icons/fi";
import { RotatingLines } from "react-loader-spinner";
import { checkFile } from "../../../components/Common/PowerUpFunctions.jsx";


export const UploadKYCDocument = (props) => {

  const userType = sessionStorage.getItem("userType")

  const [documentsUploaded, setDocumentsUploaded] = useState(null);
  const [errorText, setErrorText] = useState({ name: '', error: '' })
  const [loader, setLoader] = useState('');
  const [editingDocument, setEditingDocument] = useState(null);

  const documentDetailsRequired = [
    { documentTag: "Company Profile", documentId: "profile", remarks:"Must include last 3 year audited balance sheets"},
    { documentTag: "Company GSTN", documentId: "gstn", remarks:"Upload the valid GSTN Certificate for company"},
    { documentTag: "Company PAN", documentId: "pan", remarks:"Upload the valid PAN for company"},
    { documentTag: "Company Address Proof", documentId: "company_address", remarks:"Valid address proof for the company" },
    
    { documentTag: "Individual ID Proof", documentId: "director_id", remarks:"Pan card of Director / Partner / Proprietor" },
    { documentTag: "Individual Address Proof", documentId: "director_address", remarks:"Aadhar card of Director / Partner / Proprietor" },
    { documentTag: "Certificate Non Blacklisted Entity", documentId: "non_blacklisted_certificate", remarks:"Certificate declaring No Blacklisting of the entity" },
    { documentTag: "Quality Certificate", documentId: "quality_certificate", remarks:"ISO/TS 16949 or ISO 9001 or any equivalent National or International standard" },
    { documentTag: "Device Technical Documentation", documentId: "approach_documentation_device", remarks:"As per point 5 of Application Evaluation Criteria of SOP" },
    { documentTag: "Affidavit for Litigation", documentId: "affidavit_for_litigation", remarks:"As per point 10 of Application Evaluation Criteria of SOP" },
    { documentTag: "Data Privacy Undertaking", documentId: "data_privacy_undertaking", remarks:"As per point 11 of Application Evaluation Criteria of SOP" },
    { documentTag: "Undertaking Not sell Different Product", documentId: "undertaking_not_sell_different_product", remarks:"As per point 12 of Application Evaluation Criteria of SOP" },
    { documentTag: "Undertaking Uploading Already Fitted Devices", documentId: "undertaking_uploading_fitted_devices", remarks:"As per point 13 of Application Evaluation Criteria of SOP" },
    { documentTag: "Undertaking Licence Cancelled/Withdrawn/Suspended", documentId: "continuaton_licence_cws", remarks:"As per point 14 of Application Evaluation Criteria of SOP" },
    { documentTag: "Backend Licence", documentId: "backend_licence", remarks:"As per point 17 of Application Evaluation Criteria of SOP" },
    { documentTag: "Manufacturing Facility Detail", documentId: "manufacturing_facility", remarks:"Manufacturing Unit Details with images. Declaration from Contract Manufacturer if applicable as per Annexure B" },
    { documentTag: "Self Compliance Evaluation Form", documentId: "compliance_evaluation_form", remarks:"As per section 7 of SOP" },
    { documentTag: "Signed Copy of SOP Acceptance", documentId: "sop_acceptance", remarks:"Signed and Scanned copy of accepting SOP" },
    { documentTag: "Signed Copy of Annexures", documentId: "annexures_details", remarks:"Signed and Scanned copy of all SOP Annexures" },
  ] 


  useEffect(() => {
    console.log(props?.manufacturerData, "firstCutMnfData")
    if (props?.manufacturerData && JSON.parse(props?.manufacturerData.mnfDoc) && JSON.parse(props?.manufacturerData.mnfDoc).length > 0) {
      setDocumentsUploaded(JSON.parse(props?.manufacturerData?.mnfDoc))
    }
  }, [props?.manufacturerData])

  
  const handleFileUpload = async (e, documentId) => {
    setErrorText({})
    const name = e.target.name;

    // if (checkFile(e.target.files[0], 'pdf') == false) {
    //   return
    // }

    setLoader(name)
    const file = e.target.files[0];
    const eid = sessionStorage.getItem("entityId");
    if (file) {
      try {
        const response = await uploadDocumentMNFRegister(eid, file, documentId);
        console.log(response);
        if (response.status) {
          props.updateManufacturerData()
          setEditingDocument(null);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setLoader('')
      }
    }
  };

  const handleEditClick = (documentId) => {
    setEditingDocument(documentId);
  };
  
  const formFieldUI = (dataBlock) => {
    let documentAvailable = null
    
    let documentMatched = documentsUploaded?.length>0 && documentsUploaded.filter(item=>item.doctype===dataBlock.documentId)
    
    if(documentMatched?.length === 1){
      documentAvailable = documentMatched[0]?.docname
    }

    return (
      <div className="form-groups" >
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        {userType === "MNF" ? (!documentAvailable || editingDocument === dataBlock.documentId) ? <div style={{display:"flex"}}>
            <input style={{ outline: 'none', border: '1px solid gainsboro', maxWidth:"200px" }} type="file" accept=".pdf" name={dataBlock?.documentId} onChange={(e) => handleFileUpload(e, dataBlock?.documentId)} />
            <span className="upload_status" style={{marginLeft:"5px"}}>
            {(loader === dataBlock?.documentId) ?
              <RotatingLines
                visible={true}
                height="25"
                width="25"
                color="#000"
                strokeWidth="5"
                strokeColor="grey"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
              />
              : <GrCloudUpload size={25} color="blue"/>}
              </span>
          </div> :   
              <div style={{display:"flex"}}>
                    <p style={{color:"green", marginRight:"5px"}}><b>Available</b></p>
                    <FiCheckCircle size={20} color="green" style={{marginRight:"5px"}}/>
                    <FaEye size={20} color="blue" style={{marginRight:"5px",cursor:"pointer"}} onClick={()=>handleViewClick(documentAvailable)}/>
                    {props.stage < 2 && <MdEdit size={20} color="orange" style={{marginRight:"5px",cursor:"pointer"}}  onClick={() => handleEditClick(dataBlock.documentId)}/>}
              </div> :  !documentAvailable ?  <p style={{color:"red", marginRight:"5px"}}><b>Not Uploaded Yet</b></p>
                     : <div style={{display:"flex"}}>
                          <p style={{color:"green", marginRight:"5px"}}><b>Available</b></p>
                          <FiCheckCircle size={20} color="green" style={{marginRight:"5px"}}/>
                          <FaEye size={20} color="blue" style={{marginRight:"5px",cursor:"pointer"}} onClick={()=>handleViewClick(documentAvailable)}/>
                        </div>}                      
        </div>
      </div>
    );
  };

  const handleViewClick = async (fileURL) => {
    const imageUrl = await getDocumentFullUrl(fileURL); 
    window.open(imageUrl, '_blank');
  };

  
  return (
    <>
      <p className="emplament-heading">Documents Upload</p>
      
      <div className={`table-container border_top`} style={{padding:"20px"}}>
          <div style={{display:"grid", gridTemplateColumns:"3fr 4fr 3fr"}}>
              <p><b>Document Name</b></p>
              <p><b>Remarks</b></p>
              <p><b>Action</b></p>
          </div>
          <br></br>
            { Array.isArray(documentDetailsRequired) && 
                documentDetailsRequired?.length > 0 && 
                    documentDetailsRequired?.map((row, index) =>
                      {return <div key={index} style={{display:"grid", gridTemplateColumns:"3fr 4fr 3fr", margin:"5px", padding:"3px", borderBottom:"1px solid gray", alignItems:"center"}}>
                        <p style={{margin:"2px"}}><b>{row?.documentTag}</b></p>
                        <p style={{margin:"2px", padding:"0 5px", fontSize:"0.8rem"}}>{row?.remarks}</p>
                        <div>{formFieldUI(row)}</div>
                </div>})
            }
          
        <div className='table-card'>
          {
            documentDetailsRequired?.map((row, index) => {
              return (
                <div key={index+"_sn"} className="table-card-items">
                  <div key={index} className="table-card-cell">
                    <span className="table-card-key sub-heading">Sl.No.: </span>
                    <div className="table-card-value text">{index + 1}</div>
                  </div>
                  <div key={index+"_documentTag"} className="table-card-cell">
                    <span className="table-card-key sub-heading">Document Name: </span>
                    <div className="table-card-value text">{row?.documentTag} <span style={{ fontWeight: 600, color: 'red' }}>*</span></div>
                  </div>
                  <div key={index+"_remarks"} className="table-card-cell">
                    <span className="table-card-key sub-heading">remarks </span>
                    <div className="table-card-value text">
                      {row?.remarks}
                    </div>
                  </div>

                  <div key={index+"_sn"} className="table-card-cell">
                    <span className="table-card-key sub-heading">Upload: </span>
                    <div className="table-card-value text">
                      {formFieldUI(row)}
                      <span style={{ color: 'red', fontSize: '11px', fontWeight: '600' }}>{errorText?.name == row?.documentId && <>{errorText?.error}</>}</span>
                    </div>
                  </div>

                </div>
              )
            }
            )
          }
        </div>

      </div>
    </>
  )
};
