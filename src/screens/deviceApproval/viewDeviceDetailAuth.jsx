import React, { useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getDocumentFullUrl } from '../../apis/manufacture';
import "./style.css";

const ViewDeviceDetailAuth = () => {
    const [data, setData] = useState({})
    const location = useLocation();
    useEffect(()=>{
        console.log(location?.state);
        setData(location.state?.mCode);
    },[location])

    const getFileUrl = async (docname) => {
      console.log(docname);
      const fileUrl = await getDocumentFullUrl(docname)
      return fileUrl;
    }

  const contentView = (name = '', value = '', type = '') => {
    console.log(value);
    let parsedValue;
    try {
      parsedValue = JSON.parse(value);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      parsedValue = null;
    }
    return (
      <div className={`table-card-cell `}>
        <span className="table-card-key sub-heading">{name}</span>
        <div className="table-card-value text">
          {type === 'document' && value ? (
            <button onClick={async () => window.open(await getFileUrl(parsedValue.docname), '_blank')}>View</button>
          ) : (
            value || "N/A"
          )}
        </div>
      </div>
    );
  };
  
  
  return (
    <div style={{margin:"10px",marginTop:"30px"}}>
        <div className="id_bottom_container">
          {contentView("COP Certificate No", data?.copCertificateNo)}
          {contentView("COP Certificate", data?.copCertificate,'document')}
          {contentView("COP Approval Date", data?.copApprovalDate)}
          {contentView("COP Certificate Expiry", data?.copCertificateExpiry)}
          {contentView("TAC Certificate No", data?.tacCertificateNo)}
          {contentView("TAC Certificate", data?.tacCertificate,'document')}
          {contentView("TAC Approval Date", data?.tacApprovalDate)}
          {contentView("TAC Certificate Expiry", data?.tacCertificateExpiry)}
          {contentView("Certifying Authority", data?.certifyingAuthority)}
          {contentView("Auth Name", data?.authName)}
        </div>
    </div>  )
}

export default ViewDeviceDetailAuth
