import React, { useEffect, useState } from 'react';
import './UploadDetaisMNF.css';
import { FaEye } from 'react-icons/fa';
import { IoDocumentAttachOutline } from 'react-icons/io5';
import { fetchPresignedURL } from '../../../apis/dashboard';

const UploadDetailsMNF = ({ mnfDoc }) => {
  const [presignedUrl, setPresignedUrl] = useState(null);



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
    if (presignedUrl) {
      window.open(presignedUrl, "_blank");
      setPresignedUrl(null);
    }
  }, [presignedUrl]);
  const handleViewDocument = async (mnfDoc,docId) => {
    console.log(mnfDoc);
    const matchingDoc = JSON.parse(mnfDoc)?.find((doc) => doc.doctype === docId);
    if (matchingDoc) {
      console.log(matchingDoc.docname);
    try {
      const response = await fetchPresignedURL(matchingDoc.docname);
      if (response.status) {
        setPresignedUrl(response.url);
      } else {
        console.error("Error fetching presigned URL");
      }
    } catch (error) {
      console.error("Error fetching presigned URL:", error);
    }
  }
  };

//   console.log(data);
  const uploadDocumentUI = (dataBlock) => (
    <div
      style={{
        padding: '10px',
        margin: '10px',
        width: '173px',
        backgroundColor: 'white',
        borderRadius: '10px',
        height: '130px',
        border:"1px solid grey"
      }}
    >
      <div className='file-upload-btn'>
        <div>
          <a onClick={() => handleViewDocument(mnfDoc,dataBlock['documentId'])}>
            <FaEye
              style={{
                marginRight: '5px',
                backgroundColor: 'blue',
                borderRadius: '50%',
                padding: '5px',
                color: 'white',
              }}
            />
          </a>
        </div>
      </div>
      <div className='file-upload-img' style={{ textAlign: 'center' }}>
        <IoDocumentAttachOutline size='30px' />
      </div>
      <div className='file-upload-heading'>
        <p style={{ fontSize: '15px', marginTop: '2px', color: 'green' }}>{dataBlock['documentTag']}</p>
      </div>
    </div>
  );

  return (
    <>
      <div className='document-upload-container' style={{ margin: '20px 10px 20px 10px', padding: '0px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {documentDetailsRequired.map((item) => uploadDocumentUI(item))}
        </div>
      </div>
    </>
  );
};

export default UploadDetailsMNF;


