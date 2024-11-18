import React, { useState, useRef, useEffect } from 'react';
import { FcApproval } from 'react-icons/fc';
import { FaUpload } from 'react-icons/fa';
import '../../manufacturers/components/UploadDetaisMNF.css';
import '../../deviceApproval/components/uploadDocument.css';
import ExcelDownloadButton from '../../../components/ExcelButton';
import readXlsxFile from 'read-excel-file';
import ListTable from '../../../components/Common/Listtable/ListTable';
import jsPDF from "jspdf";
import Swal from 'sweetalert2';
import { getDocumentFullUrl } from '../../../apis/manufacture';
import { getFitmentByID, uploadBulkRFCExcelList } from '../../../apis/rfcMaster';
import { uploadDocumentMNFRegister } from '../../../apis/dashboard';

const AddDSTList = ({ dstList, modelCode, mnfData, updateManufacturerData }) => {
  const userType = sessionStorage.getItem('userType');
  const [presignedUrl, setPresignedUrl] = useState(null);
  const [distributorData, setDistributorData] = useState({
    dstName: '',
    name: '',
    email: '',
    mobile: '',
    address: '',
    district: '',
    state: '',
    city: '',
    pin: ''
  });
  const [dstData, setDSTData] = useState({});
  const [errors, setErrors] = useState({});
  const [docnameURL, setDocnameURL] = useState(null);
  const fileInputRef = useRef(null);

  const fetchDSTData = async () => {
    const res = await getFitmentByID(modelCode);
    console.log(res.result[0]);
    setDSTData(res?.result[0]);
  };

  useEffect(() => {
    const fileFilter = JSON.parse(mnfData?.mnfDoc).filter(item => item?.doctype === "master_distributor_agreement_signed")[0];
    setDocnameURL(fileFilter?.docname);
  }, [mnfData]);

  const handleFileUpload = async (e, documentId) => {
    const name = e.target.name;
    const file = e.target.files[0];
    const eid = mnfData?.id;
    console.log(file, name, documentId, "handleFileUploadDSTAgreement");
    if (file) {
      try {
        const response = await uploadDocumentMNFRegister(eid, file, documentId);
        console.log(response, "YEYYIEUEOI");
        if (response.status) {
          setDocnameURL(response?.fileurl);
          updateManufacturerData();
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  useEffect(() => {
    fetchDSTData();
  }, [modelCode]);

  useEffect(() => {
    if (presignedUrl) {
      window.open(presignedUrl, '_blank');
      setPresignedUrl(null);
    }
  }, [presignedUrl]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setDistributorData({ ...distributorData, [name]: value });

    // Validate the field on change and clear error if valid
    const newErrors = { ...errors };
    const fieldErrors = validateField(name, value);
    if (!fieldErrors[name]) {
      delete newErrors[name];
    } else {
      newErrors[name] = fieldErrors[name];
    }
    setErrors(newErrors);
  };

  const validateField = (name, value) => {
    let fieldErrors = {};
    if (name === 'email' && value) {
      if (!/\S+@\S+\.\S+/.test(value)) {
        fieldErrors.email = 'Email is invalid';
      }
    }
    if (name === 'mobile' && value) {
      if (!/^\d{10}$/.test(value)) {
        fieldErrors.mobile = 'Mobile No is invalid';
      }
    }
    if (name === 'pin' && value) {
      if (!/^\d{6}$/.test(value)) {
        fieldErrors.pin = 'Pin Code is invalid';
      }
    }
    if (!value) {
      fieldErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }
    return fieldErrors;
  };

  const validate = () => {
    let formErrors = {};
    Object.keys(distributorData).forEach((key) => {
      const fieldErrors = validateField(key, distributorData[key]);
      formErrors = { ...formErrors, ...fieldErrors };
    });
    return formErrors;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    const uploadData = [
      {
        dstName: distributorData.dstName,
        mnfName: mnfData?.entityName,
        deviceModel: modelCode,
        name: distributorData.name,
        email: distributorData.email,
        mobile: distributorData.mobile,
        address: distributorData.address,
        district: distributorData.district,
        state: distributorData.state,
        city: distributorData.city,
        pin: distributorData.pin,
        type: 'DST',
      },
    ];
    try {
      const response = await uploadBulkRFCExcelList(uploadData);
      let data = response?.filter((item) => item?.status === false);
      await fetchDSTData();
      if (data.length === 0) {
        Swal.fire({
          icon: 'success',
          title: '',
          text: 'Distributors added successfully.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: '',
          text: `Error`,
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const formFieldUI = (label, name, type, star = '', disabled = false, data) => {
    return (
      <div key={name} className="form-groups">
        {errors[name] ? <span className="error-message" style={{color:"red",fontSize:"13px"}}>{errors[name]}</span> : <label className="form-labels">
          {label}
          <sup>{star}</sup>
        </label>}
        <input
          style={{ backgroundColor: disabled ? 'rgba(0,0,0,0.1)' : '' }}
          required
          className="form-inputs"
          disabled={disabled}
          name={name}
          type={type}
          value={name === 'mnfName' || name === 'deviceModel' ? data : distributorData[name] || ''}
          onChange={onChange}
        />
      </div>
    );
  };

  const mapData = {rfcName: "Distributor Name", mnfName:"Manufacture Name", deviceModel:"Device Model", name:"Name", email:"Email", mobile:"Mobile Number", address:"Address", createdDt:"Created Date", city:"City", state:"State", district:"District", pin:"Pin Code"};

  const contentView = (name = '', value = '') => {
    return (
      <div className="table-card-cell full_width">
        <span className="table-card-key sub-heading">{mapData[name]}: </span>
        <span className="table-card-value">{value}</span>
      </div>
    );
  };

  const onClickViewDocument = async () => {
    window.open(await getFileUrl(docnameURL), "_blank");
  };

  const getFileUrl = async (docname) => {
    const fileUrl = await getDocumentFullUrl(docname);
    return fileUrl;
  };

  const downloadFormat = async () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("To,", 10, 30);
    doc.text("Transport Department,", 10, 40);
    doc.text("Maharashtra", 10, 50);
    doc.text("Subject: Self declaration of Line-fit/Factory fit VLT device", 10, 70);
    const bodyText = `
Dear Sir,

This is to confirm that, our VLT device model number _________ is Line fitted/factory fitted by 
_________ in all vehicles of following models.

I confirm that this declaration is true to the best of my knowledge. If any deviation is found by
the department, they can take suitable action against me including blacklisting me in the 
State of Maharashtra.

Signed and Stamped

Place :
Date :
    `;
    doc.text(bodyText, 10, 90);
    doc.save("declaration.pdf");
  };

  return (
    <>
      {dstData ? (
        <>
          <p className="emplament-heading">Distributor Details</p>
          <div
            className="id_top_container"
            style={{
              backgroundColor: 'white',
              padding: '10px',
              borderRadius: '8px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
            }}
          >
            {Object?.keys(dstData)?.filter(item => Object?.keys(mapData).includes(item)).map((key) => contentView(key, dstData[key]))}
          </div>
          
          {(userType === 'MNF') && JSON.parse(mnfData["mnfDoc"]).filter(item => item?.doctype === "master_distributor_agreement_signed").length === 0 && (
            <div className="id_top_container" style={{ backgroundColor: 'white', padding: '10px', borderRadius: '8px', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <label className="form-labels">Upload Master Distributor Agreement</label>
              <input
                ref={fileInputRef}
                name="master_distributor_agreement_signed"
                type="file"
                accept=".jpg, .png, .pdf, .jpeg"
                onChange={(e) => handleFileUpload(e, "master_distributor_agreement_signed")}
              />
            </div>
          )}
          
          <div className="btn-container" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="cancel-btn" onClick={handleSave}>
              Save
            </button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default AddDSTList;
