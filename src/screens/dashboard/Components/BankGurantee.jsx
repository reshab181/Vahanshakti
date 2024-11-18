import React, { useState, useEffect } from 'react';
import { updateBG } from '../../../apis/deviceInventory';
import { FormFieldValidation } from '../../../components/fieldErrorValidation';
import '../../manufacturers/components/UploadDetaisMNF.css'
import { indianDate, nullToNA } from '../../../components/Common/PowerUpFunctions';
import { BankNames } from '../../../constants/BanksList';
import { getDocumentFullUrl, uploadDocManufacture } from '../../../apis/manufacture';
import Swal from "sweetalert2";
import { RotatingLines } from 'react-loader-spinner';


const BankGuarantee = ({manufacturerData, setStage, updateManufacturerData}) => {
  
  const userType = sessionStorage.getItem("userType")

  const [bgDetail, setBgDetail] = useState(null)
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fieldValidationErrors, setFieldValidationErrors] = useState({})
  const [apiResponseError, setApiResponseError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [docrURL, setDocURL] = useState(null)
  const [isUploading, setIsUploading] = useState(false);
  const [presignedUrl, setPresignedUrl] = useState(null);
  
  useEffect(()=>{
    setIsLoading(true)
    if(manufacturerData && manufacturerData.bgDet){
      console.log(manufacturerData.bgDet, "Performance bank Guarantee")
      setBgDetail(JSON.parse(manufacturerData.bgDet))
      setDocURL(manufacturerData.bgDet)
    }
    setIsLoading(false)

  },[manufacturerData])  

  useEffect(() => {
    if (presignedUrl) {
      window.open(presignedUrl, "_blank");
      setPresignedUrl(null);
    }
  }, [presignedUrl]);

  
  const onChange = async (e) => {
    const { name, type } = e.target;

    if (type === 'file') {
      setIsUploading(true);
      const file = e.target.files[0];
      try{
        const uploadResponse = await uploadDocManufacture(file);
        if(uploadResponse.status){
          setFormData({
            ...formData,
            ['docname']: uploadResponse.fileurl || '',
          });
        } else {
          setApiResponseError(uploadResponse.status)
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        setApiResponseError('Error uploading file.');
      } finally {
        setIsUploading(false); 
      }
  
    } else {
      setFormData({
        ...formData,
        [name]: e.target.value,
      });
    }

  };
  
 
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    
      const requiredVariables = ["bgno", "bgamt", "bank", "bgdate","bgexpiry", "docname"]
  
      const checkSubmitError = {...fieldValidationErrors}
      for (let item of requiredVariables){
        if(!(item in formData)){
          const errorItem = item + " value is required"
          checkSubmitError[item] = errorItem
        }
      }
      
      setFieldValidationErrors({...checkSubmitError})

      if (Object.values(checkSubmitError).filter(item=>item !== undefined).length == 0){
        const apiData = {
        bg_details: {
          bgno: formData.bgno,
          bank: formData.bank,
          bgdate: formData.bgdate,
          bgexpiry: formData.bgexpiry,
          doctype: "BG_IMAGE", 
          docname: formData.docname,
          bgamt: formData.bgamt
        },
        id: manufacturerData?.id,
      };
  
      try {
        const response = await updateBG(apiData);
        if (response.status) {
          console.log(response, "BG Data Uploaded")
          await updateManufacturerData()
          Swal.fire({
            icon: "success",
            title: "BG Data! Uploaded",
            text: `Please Wait for Approval!`,
          });
        } else {
          setApiResponseError(response?.message)
          setTimeout(()=>setApiResponseError(null), 30000);    
          console.error('API call failed:', response.message);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  };

  
  const formFieldUI = (label, name, type, star="", validation="text") => {
    
    const validateData = () => {
      
      const formFieldvalidate = FormFieldValidation(validation, formData[name], label)
      if(formFieldvalidate!==0 && formFieldvalidate!==undefined){
        setFieldValidationErrors({...fieldValidationErrors, [name]:formFieldvalidate})
      } else {
        const newState = { ...fieldValidationErrors };
        delete newState[name];
        setFieldValidationErrors(newState);
      } 
    }
    return (
      <div key={name} className="form-groups">
        {!fieldValidationErrors?.[name] ? <label className="form-labels">
                      {label}<sup>{star}</sup>
                      </label>: <label style={{color:"red", fontSize:"9px"}}><b>{fieldValidationErrors[name]}</b></label>}
        {type === 'file' ? (
          <>
          <span style={{display:"flex"}}>
            <input className="form-inputs" type={type} name={name} onChange={onChange} />
            {isUploading  &&
              <RotatingLines
                visible={true}
                height="25"
                width="25"
                color="#000"
                strokeWidth="5"
                strokeColor="grey"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            }
          </span>
          </>
        ) : (
          <>
            <input
              required
              className="form-inputs"
              name={name}
              value={formData[name]?.toUpperCase()}
              type={type}
              onChange={onChange}
              onBlur={()=>validateData()}
            />
          </>
        )}
      </div>
    );
  };

    const selectFormField = (label, name, star) => {
    return (
      <div key={name} className="form-groups">
        <label className="form-labels">
          {label}
          <sup>{star}</sup>
        </label>
        <select
          required
          className="form-inputs"
          name={name}
          onChange={(e) => onChange(e)}
          value={formData[name]}
        >
          <option value="">Select</option>
          {Array.isArray(BankNames) &&
            BankNames.map((option) => (
              <option key={option.id} value={option.entitycode}>
                {option.entitycode}
              </option>
            ))}
        </select>
        {errors[name] && (
          <div className="error-message" style={{ color: "red", fontSize: "13px" }}>
            {errors[name]}
          </div>
        )}
      </div>
    );
  };

  const mapData = {bgno: "BG Number",bgamt: "BG Amount", bank:"Issuing Bank",doctype:"Document Type", bgdate:"BG Issue Date", bgexpiry:"BG Expiry Date", docname:"BG Document"}

  const bgDetailsUI = () => {

    
    return <div>
            <p className="emplament-heading">Bank Guarantee Details</p>
            <div className='id_top_container' style={{backgroundColor:"white",padding:"10px",borderRadius:"8px"}}>
              {Object?.keys(bgDetail)?.map((key, index) =>
                  contentView(
                    key, 
                    bgDetail[key], 
                    ['docname'].includes(key),
                    ['bgexpiry', 'bgdate'].includes(key),
                    )
                )}
            </div>
            {(userType === "SBU" || userType === "SUA")  && manufacturerData ? <div className='saveNextEmplamentButton'>
              <button  onClick={(e)=>setStage(2)}>Approve for next stage</button>
          </div> : null}

            </div>
  }

  const getFileUrl = async (docname) => {
    const fileUrl = await getDocumentFullUrl(docname)
    return fileUrl;
  }

  const contentView = (name = '', value = '', file = false, isDate = false, type = '') => {
    const docname = bgDetail?.docname;
    console.log(docname);
    const parts = docname.split("\\");
    const fileName = parts[parts.length - 1];
    console.log(fileName);
    if (file) {
      return (
        <>
          <div className={`table-card-cell ${type == 'full' && ' full_width'}`}>
            <span className="table-card-key sub-heading">{mapData[name]} </span>
            <button style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }} onClick={async () => window.open(await getFileUrl(fileName), '_blank')}>View</button>
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


  return (

    <>
    {isLoading?(<p>Loading.</p>):
    bgDetail ? bgDetailsUI() : 
    userType === "MNF" ? <div>
    <p className="emplament-heading">Performance Bank Guarantee</p>
    <div className="form-container " style={{margin:"0",padding:"15px"}}>
      <div>
        <div className="form-tag">
        {apiResponseError ? <p style={{padding:"10px", backgroundColor:"red", color:"white", marginBottom:"5px", borderRadius:"5px"}}><b>{apiResponseError}</b></p> : null}
        <p className="form-identifire-para">Bank Details</p>
          <div className="form-rows">   
              {formFieldUI("BG Id", "bgno", "text", "*", "text")}
              {formFieldUI("BG Amount", "bgamt", "number", "*", "text")}
              {selectFormField("Issuing Bank", "bank", "*")}
          </div>
          <div className="form-rows">
              {formFieldUI("BG Issue Date", "bgdate", "date", "*", "date_lt")}
              {formFieldUI("BG Expiry Date", "bgexpiry", "date", "*", "date_gt")}
              {formFieldUI("BG Document","docname","file", "*")}
          </div>

        </div>
      </div>
    </div>
    
    {userType === "MNF" && manufacturerData ? <div className="saveNextEmplamentButton">
        <button onClick={(e)=>handleSubmit(e)}>Save</button>
    </div> : null}

    </div> : <div style={{display: "flex", justifyContent:"center", backgroundColor:"white", padding:"20px"}}><p style={{color:"red"}}><b>No Bank Guarantee Details Uploaded Yet!!</b></p></div>
    }
    </>
    
  );
};

export default BankGuarantee