import React, { useEffect, useState } from 'react'
import { addDeviceApproval, getAllApprovedDeviceUser, getApprovingAuthority, getDeviceApprovalByEID, getEsimAllProviderIdCodeName, uploadDocDeviceApproval } from '../../../apis/masters';
import { FormFieldValidation } from '../../../components/fieldErrorValidation';
import '../../manufacturers/components/UploadDetaisMNF.css';
import './style.css';
import { indianDate, nullToNA } from '../../../components/Common/PowerUpFunctions';
import '../../deviceApproval/style.css'
import Swal from "sweetalert2";
import { getDocumentFullUrl } from '../../../apis/manufacture';
import { RotatingLines } from "react-loader-spinner";
import { FiCheckCircle } from "react-icons/fi";
import { GrCloudUpload } from "react-icons/gr";

const AddDeviceEmplament = ({ manufacturerData, fetchApprovalDevicesRefresh}) => {

  const userType = sessionStorage.getItem("userType")

  const detailView = {"modelCode":"Model Code", "modelName":"Model Name", "certifyingAuthority":"Certifying Authority", "isIrnss": "IS IRNSS", "tacCertificateNo": "TAC Number", "tacApprovalDate":"TAC Approval Date", "tacCertificateExpiry": "TAC Expiry", "tacCertificate":"TAC View", "copCertificateNo": "COP Number", "copApprovalDate": "COP Approval Date", "copCertificateExpiry": "COP Expiry", "copCertificate": "COP View", "uploadedon": "Uploaded On", "authStatus": "Authority Approval", "authRemarks": "Authority Remarks", "device_fee": "Device Fees"}
  
  const [uploadedDevice, setUploadedDevice] = useState(null)
  const [deviceData, setDeviceData] = useState({})
  const [approvingAuthorityList, setApprovingAuthorityList] = useState([]);
  const [esimProviderList, setESIMProviderList] = useState(null)
  const [selectedESIMProviders, setSelectedESIMProviders] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [fieldValidationErrors, setFieldValidationErrors] = useState({})
  const [apiResponseError, setApiResponseError] = useState(null)
  const [isUploading, setIsUploading] = useState({ tacCertificate: false, copCertificate: false });

  const fetchApprovalDevices = async () => {
    setIsLoading(true)
    if (userType === "SBU" || userType === "SUA") {
      console.log(manufacturerData)
      const response = await getDeviceApprovalByEID(manufacturerData?.id)
      if(response.length>0){
      setUploadedDevice(response[0])
    }
    }

    if (userType === "MNF") {
      const response = await getAllApprovedDeviceUser()
      if(response.length>0){
        setUploadedDevice(response[0])
      
      }
    }
    setIsLoading(false)
  }


  useEffect(() => {
    fetchApprovalDevices()
  }, [])

  useEffect(() => {

    const fetchESIMProviderData = async () => {
      try {
        const result = await getEsimAllProviderIdCodeName();
        console.log("ESIMProviderData", result)
        setESIMProviderList(result);
      } catch (error) {
        console.error('Error fetching ESIM providers:', error);
      }
    };
    fetchESIMProviderData();
  }, [])


  useEffect(() => {
    const fetchApprovingAuthorityData = async () => {
      try {
        const result = await getApprovingAuthority();
        console.log("ApprovingAuthorityData", result)
        setApprovingAuthorityList(result);
      } catch (error) {
        console.error("Error fetching approving authorities:", error);
      }
    };

    fetchApprovingAuthorityData();
  }, [])


  // const onChange = (e) => {
  //   setDeviceData(prevData=>{return{...prevData, [e.target.name]: e.target.value }})
  // }

  const onChange = (e) => {
    setDeviceData(prevData => {
      const newData = { ...prevData, [e.target.name]: e.target.value };
  
      // Remove the validation error for the specific field
      if (fieldValidationErrors[e.target.name]) {
        const newState = { ...fieldValidationErrors };
        delete newState[e.target.name];
        setFieldValidationErrors(newState);
      }
  
      return newData;
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredVariables = ["model_code", "model_name", "certifying_authority", "tac_certificate_no", "tac_approval_date", "tac_certificate_expiry",  "device_fee"]
    const requiredFiles = ["tac_certificate"];

    console.log(deviceData, "dataTOBeUploaded");
    const checkSubmitError = { ...fieldValidationErrors }
    let fileUploadError = false;

    for (let item of requiredVariables) {
      if (!(item in deviceData)) {
        console.log(item);
        const errorItem = item + " value is required"
        checkSubmitError[item] = errorItem
      }
    }

    // Check if required files are uploaded
    requiredFiles.forEach((file) => {
      if (!(file in uploadedFiles)) {
        checkSubmitError[file] = `${file} is required`;
        fileUploadError = true;
      }
    });

      // Check if at least one ESIM provider is selected
      if (selectedESIMProviders.length === 0) {
        checkSubmitError["esim_provider"] = "At least one ESIM provider must be selected";
        setFieldValidationErrors(checkSubmitError["esim_provider"]);
      }

    setFieldValidationErrors({ ...checkSubmitError })
    console.log(checkSubmitError);
    if (Object.values(checkSubmitError).filter(item => item !== undefined).length == 0 && !fileUploadError) {

      console.log(deviceData, "UploadedDeviceData")
      // setIsLoading(true)
      const uploadData = {
        model_code: deviceData.model_code,
        model_name: deviceData.model_name,
        is_irnss: parseInt(deviceData.is_irnss),
        certifying_authority: deviceData.certifying_authority,
        tac_certificate_no: deviceData.tac_certificate_no,
        tac_certificate: {
          doctype: "tac_certificate",
          docname: uploadedFiles.tac_certificate,
        },
        tac_approval_date: deviceData.tac_approval_date,
        tac_certificate_expiry: deviceData.tac_certificate_expiry,
        cop_certificate_no: deviceData?.cop_certificate_no || null,
        cop_certificate: uploadedFiles?.cop_certificate ? {
          doctype: "cop_certificate",
          docname: uploadedFiles?.cop_certificate,
        }: null,
        cop_approval_date: deviceData.cop_approval_date  || null,
        cop_certificate_expiry: deviceData.cop_certificate_expiry  || null,
        device_fee: deviceData.device_fee,
      };
      uploadData["esim_allowed"] = selectedESIMProviders.map((provider) => ({
        esim_id: provider.providerCode,
        name: provider.providerName
      }))
      sessionStorage.setItem("modelCodeEmplanment", deviceData.model_code)
      console.log(uploadData);
      try {
        const response = await addDeviceApproval(uploadData);
        if(response?.status){
          await fetchApprovalDevices() 
          await fetchApprovalDevicesRefresh()
          await Swal.fire({
            icon: "success",
            title: "Success!",
            text: `Please complete rest of the onboarding process`,
          });
        
        } else {
          await Swal.fire({
            icon: "error",
            title: "Something went wrong!",
            text: `${response?.message}`,
          });
          
        }
        
      } catch (error) {
        await fetchApprovalDevices()  
        console.log("Error in addDeviceApproval:", error);
      }
    }
  }

  
  const formFieldUI = (label, name, type, star = "", validation = "") => {
    const validateData = () => {
      const formFieldvalidate = FormFieldValidation(validation, deviceData[name], label)
      if (formFieldvalidate !== 0 && formFieldvalidate !== undefined) {
        setFieldValidationErrors({ ...fieldValidationErrors, [name]: formFieldvalidate })
      } else {
        const newState = { ...fieldValidationErrors };
        delete newState[name];
        setFieldValidationErrors(newState);
      }
    }
    
    return (<div key={name} className="form-groups">
      {!fieldValidationErrors?.[name] ? <label className="form-labels">
        {label}<sup>{star}</sup>
      </label> : <label style={{ color: "red", fontSize: "9px" }}><b>{fieldValidationErrors[name]}</b></label>}
      <input
        required
        className="approval-select-form-text-inputs"
        name={name}
        type={type}
        value={deviceData[name]}
        onChange={(e) => onChange(e)}
        onBlur={() => validation !== "" && validateData()}
      />
    </div>)
  }

  const selectFormField = (label, name, star, options = [], defaultValue="") => {
    console.log(options, "approvingAuthority")
    return (
      <div key={name} className="form-groups">
          {!fieldValidationErrors?.[name] ? <label className="form-labels">
        {label}<sup>{star}</sup>
      </label> : <label style={{ color: "red", fontSize: "9px" }}><b>{fieldValidationErrors[name]}</b></label>}
        <select required className="approval-selct-form-inputs" name={name} onChange={e => onChange(e)} value={deviceData[name]}>
        <option value="">Select</option>
          {Array.isArray(options) &&
            options.map(option => (
              <option key={option.authId} value={option.entitycode}>
                {option.entityName}
              </option>
            ))}
        </select>
      </div>
    );
  };

  const selectFeild1 = (label, name, star) => {
    return (
      <div key={name} className="form-groups">
         {!fieldValidationErrors?.[name] ? <label className="form-labels">
        {label}<sup>{star}</sup>
      </label> : <label style={{ color: "red", fontSize: "9px" }}><b>{fieldValidationErrors[name]}</b></label>}
        <select
          required
          className="approval-selct-form-inputs"
          name={name}
          onChange={e => onChange(e)}
        >
          <option value="">Select</option>
          <option value="0">False</option>
          <option value="1">True</option>
        </select>
      </div>
    );
  }

  const getFileUrl = async (docname) => {
    const fileUrl = await getDocumentFullUrl(docname)
    return fileUrl;
  }

  const fileUploadUI = (label, name, type, star) => {
    const handleFileUpload = async (e, docname) => {
      const file = e.target.files[0];
      setIsUploading({ ...isUploading, [docname]: true });
      if (file) {
        
        const response = await uploadDocDeviceApproval(file, docname);
        setUploadedFiles({
          ...uploadedFiles,
          [docname]: response.filename
        });
        const newState = { ...fieldValidationErrors };
        delete newState[docname];
        setFieldValidationErrors(newState);
        
      }
      setIsUploading({ ...isUploading, [docname]: false });
    };

    return (
      <div key={name} className="form-groups">
    {!fieldValidationErrors?.[name] ? (
              <label className="form-labels">
                {label}
                <sup>{star}</sup>
              </label>
            ) : (
              <label style={{ color: "red", fontSize: "9px" }}>
                <b>{fieldValidationErrors[name]}</b>
              </label>
            )}
        <div className="" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><input
          required
          className="approval-select-form-file-upload"
          name={name}
          type={type}
          onChange={(e) => handleFileUpload(e, name)}
        />
        {isUploading[name] && (
          <RotatingLines
            visible={true}
            height={25}
            width={25}
            color="#000"
            strokeWidth={5}
            strokeColor="grey"
            animationDuration={0.75}
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) 
        // : (
        //   <>
        //   {
        //     !uploadedFiles[name] ? <span style={{ color: 'blue' }}><GrCloudUpload size={20} /></span> : <span style={{ color: 'green' }}><FiCheckCircle size={20} /></span>
        //   }
        // </> 
        // )
      }</div>
      </div>
    );
  };

  const mapData = {modelCode: "Model Code",modelName: "Model Name", certifyingAuthority:"Certifying Authority",isIrnss:"IsIrnss", tacCertificateNo:"Tac Certificate No", tacCertificateExpiry:"Tac Certificate Expiry", tacApprovalDate:"Tac Approval Date",tacCertificate:"Tac Certificate",copCertificateNo:"Cop Certificate No",copCertificateExpiry:"Cop Certificate Expiry",copApprovalDate:"Cop Approval Date",copCertificate:"Cop Certificate",uploadedon:"Uploaded Date",authStatus:"Auth Status",authRemarks:"Auth Remarks"}
 

  const contentView = (name = '', value = '', file = false, isDate = false, type = '') => {
    let docname = '';

    if (['ddDet', 'fileUploadProtocolSpec', 'tacCertificate', 'copCertificate'].includes(name)) {
      const parsedValue = JSON.parse(value);
      docname = parsedValue && parsedValue?.docname ? parsedValue?.docname : '';


      return (
        <>
          <div className={`table-card-cell ${type == 'full' && ' full_width'}`}>
            <span className="table-card-key sub-heading">{mapData[name]} </span>
            <button style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }} onClick={async () => window.open(await getFileUrl(docname), '_blank')}>View</button>
          </div>
        </>
      )
    } else {
      return (
        <>
          {!Array.isArray(value) && <div className={`table-card-cell ${type == 'full' && ' full_width'}`}>
            <span className="table-card-key sub-heading">{mapData[name]} </span>
            <div className="table-card-value text">{isDate ? indianDate(value) : nullToNA(value)}</div>
          </div>}
        </>
      )
    }
  }

  const renderESIMProviders = () => {
    return (
      <div className="form-groups">
          <p className="approval-form-identifire-para"  style={{color:"gray", fontSize:"1rem", marginTop:"25px"}}>Permitted ESIM</p>

        {esimProviderList?.map((provider) => (
          <div key={provider.providerCode}>
            <label>
              <input
                type="checkbox"
                value={provider.providerCode}
                checked={selectedESIMProviders.some((selectedProvider) => selectedProvider.providerCode === provider.providerCode)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedESIMProviders([...selectedESIMProviders, provider]);
                  } else {
                    setSelectedESIMProviders(
                      selectedESIMProviders.filter((selectedProvider) => selectedProvider.providerCode !== provider.providerCode)
                    );
                  }
                  if (fieldValidationErrors.esim_provider) {
                    const newState = { ...fieldValidationErrors };
                    delete newState.esim_provider;
                    setFieldValidationErrors(newState);
                  }
                }}
              />
              {provider.providerName}
            </label>
          </div>
        ))}
        {fieldValidationErrors?.esim_provider && (
          <label style={{ color: "red", fontSize: "9px" }}>
            <b>{fieldValidationErrors.esim_provider}</b>
          </label>
        )}
      </div>
    );
  };

  return (
    <>
      {isLoading ? (<p>Loading.</p>) :
        uploadedDevice ? <div className='id_top_container' style={{ backgroundColor: "white", padding: "10px", borderRadius: "8px" }}>
          {Object?.keys(uploadedDevice)?.filter(item=>Object?.keys(detailView).includes(item))?.map((key, index) =>
              contentView(
                key,
                uploadedDevice[key],
                ['copCertificate', 'fileUploadProtocolSpec', 'fileUploadTechnicalSpec', 'tacCertificate', 'ddDet'].includes(key),
                ['copCertificateExpiry', 'copApprovalDate', 'approvedon', 'uploadedon', 'createdOn', 'tacApprovalDate', 'tacCertificateExpiry'].includes(key),
              )
        )}
        </div> :
          userType === "MNF" ? <div>
            <p className="emplament-heading">Add Device</p>
            <div className="form-tag addDeviceEmplament" style={{ margin: "5px"}}>
              {apiResponseError ? <p style={{ padding: "10px", backgroundColor: "red", color: "white", marginBottom: "5px", borderRadius: "5px" }}><b>{apiResponseError}</b></p> : null}
              <p className="approval-form-identifire-para" style={{color:"gray", fontSize:"1rem"}}>Device identifiers</p>
              <div className="form-rows">
                  {formFieldUI("Vendor Code", "model_code", "text","*", "text")}
                  {formFieldUI("Model Name", "model_name", "text","*", "entity_name")}
              </div>
              <div className="form-rows">
                  {selectFeild1("Is IRNSS", "is_irnss","*")}
                  {selectFormField("Certifying Authority", "certifying_authority","*",approvingAuthorityList)}
                  {formFieldUI("Model Price", "device_fee", "number","*", "price")}
              </div>
              <p className="approval-form-identifire-para"  style={{color:"gray", fontSize:"1rem", marginTop:"25px"}}>TAC Certificate Details</p>
              <div className="form-rows">
                {formFieldUI("TAC Certificate No", "tac_certificate_no", "text", "*", "text_wos")}
                {fileUploadUI("Upload TAC Certificate", "tac_certificate", "file", "*")}
              </div>
              <div className="form-rows">
                {formFieldUI("Approval Date", "tac_approval_date", "date", "", "")}
                {formFieldUI("Expiry Date", "tac_certificate_expiry", "date", "", "")}
              </div>
              <p className="approval-form-identifire-para"  style={{color:"gray", fontSize:"1rem", marginTop:"25px"}}>COP Certificate Details</p>
              <div className="form-rows">
                {formFieldUI("COP Certificate No", "cop_certificate_no", "text", "", "")}
                {fileUploadUI("Upload COP Certificate", "cop_certificate", "file", "")}
              </div>
              <div className="form-rows">
                {formFieldUI("Approval Date", "cop_approval_date", "date", "", "")}
                {formFieldUI("Expiry Date", "cop_certificate_expiry", "date", "", "")}
              </div>
              {/* <p className="approval-form-identifire-para"  style={{color:"gray", fontSize:"1rem", marginTop:"25px"}}>Permitted ESIM</p> */}
              <div className="form-rows">
                {renderESIMProviders()}
              </div>
            </div>
            <div className="form-submit-btn" style={{marginBottom:"10px"}}>
              <button onClick={handleSubmit}>Save</button>
            </div>
          </div> : <div style={{display: "flex", justifyContent:"center", backgroundColor:"white", padding:"20px"}}><p style={{color:"red"}}><b>No Device Details Uploaded Yet!!</b></p></div>}
    </>
  )
}

export default AddDeviceEmplament
