import { useState, useEffect } from "react";
import { LoadingWidget } from "../../../components/loading";
import { addDeviceApproval, getAllApprovedDeviceUser, getApprovingAuthority, getEsimAllProviderIdCodeName, uploadDocDeviceApproval } from "../../../apis/masters";
import './deviceApproval.css'
import {FormFieldValidation} from "../../../components/fieldErrorValidation";
import { indianDate, nullToNA } from "../../../components/Common/PowerUpFunctions";
import Swal from "sweetalert2";
import { getDocumentFullUrl } from "../../../apis/manufacture";


export const AddDeviceApprovalComponent = ({uploadedDeviceDetail=null, refreshDeviceDetail,setCurrentPanel,setColor}) => {
    
    const [deviceData, setDeviceData] = useState({})    
    const [approvingAuthorityList, setApprovingAuthorityList] = useState([]);
    const [esimProviderList, setESIMProviderList] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [uploadedFiles, setUploadedFiles] = useState({});
    const [esim,setEsim]=useState(null)
    const [fieldValidationErrors, setFieldValidationErrors] = useState({})

    useEffect(()=>{
      const fetchApprovalDevices = async () => {
          const response = await getAllApprovedDeviceUser()
          console.log(response, "fetched Device from MNF")
          // setUploadedDevice(response[0])
        }
      fetchApprovalDevices()
    },[])

    useEffect(()=>{
      uploadedDeviceDetail ? ( setColor("enabledd")) : null
    },[])
    
    
    useEffect(()=>{
      const fetchApprovingAuthorityData = async () => {
        try {
          const result = await getApprovingAuthority();
          console.log("Approving Authority Data", result)
          setApprovingAuthorityList(result);
        } catch (error) {
          console.error("Error fetching approving authorities:", error);
        }
      };

      const fetchESIMProviderData = async () => {
        try {
          const result = await getEsimAllProviderIdCodeName();
          console.log("ESIM Provider Data", result)
          setESIMProviderList(result);
          setEsim(result.providerCode)
        } catch (error) {
          console.error('Error fetching ESIM providers:', error);
        }
      };

      fetchESIMProviderData();
      fetchApprovingAuthorityData();
    },[])
    
   const handleSubmit = async (e) => {
      const requiredVariables = ["model_code", "model_name",  "tac_certificate_no", "tac_approval_date", "tac_certificate_expiry", "cop_certificate_no", "cop_approval_date", "cop_certificate_expiry", "device_fee"];

      // Check for empty fields
      const checkSubmitError = {};
      requiredVariables.forEach(item => {
        if (!(item in deviceData) || !deviceData[item]) {
          checkSubmitError[item] = `${item.replace('_', ' ')} value is required`;
        }
      });
    
      // Check for empty select options
      const selectFields = ["certifying_authority"];
      selectFields.forEach(field => {
        if (!deviceData[field]) {
          checkSubmitError[field] = `${field.replace('_', ' ')} value is required`;
        }
      });
    
      // Check for empty selectField1
      if (!deviceData.is_irnss) {
        checkSubmitError.is_irnss = "Is IRNSS value is required";
      }
    
      // Check for empty file uploads
      const fileUploadFields = ["tac_certificate", "cop_certificate"];
      fileUploadFields.forEach(field => {
        if (!uploadedFiles[field]) {
          checkSubmitError[field] = `Please upload file`;
        }
      });
  
      setFieldValidationErrors({...checkSubmitError})
      if (Object.values(checkSubmitError).filter(item=>item !== undefined).length == 0){
      
        setIsLoading(true)
        console.log(uploadedFiles, "Uploaded File")
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
              cop_certificate_no: deviceData.cop_certificate_no,
              cop_certificate: {
                doctype: "cop_certificate",
                docname: uploadedFiles.cop_certificate,
              },
              cop_approval_date: deviceData.cop_approval_date,
              cop_certificate_expiry: deviceData.cop_certificate_expiry,
              device_fee: deviceData.device_fee,
            };
            uploadData["esim_allowed"] = esimProviderList.map((provider) => ({
              esim_id: provider.providerCode,
              name: provider.providerName
            }))
              
            console.log("uploadData for Add Device",uploadData);
            try{
              const response = await addDeviceApproval(uploadData);
              console.log(response);
              if (response?.status == true) {
                Swal.fire({
                  icon: "success",
                  title: "Device details successfully added",
                  text: `Please complete the rest of the device approval process`,
                });
                setIsLoading(false)
                refreshDeviceDetail(response.model_code)
                sessionStorage.setItem("model_code",response.model_code)
                setCurrentPanel("dd_details")
                setColor("enabledd")
              }else{
                console.log("Error");
                setIsLoading(false)
              }
          } catch (error) {
            console.log("Error in addDeviceApproval:", error);
          }          
        }
      } 
      
      
    
      const formFieldUI = (label, name, type, star = "", validation = "text") => {
        const validateData = (value) => {
          let errorMessage = "";
      
          // Validation rule for special characters
          const specialCharRegex = /[^a-zA-Z0-9\s]/;
      
          const formFieldvalidate = FormFieldValidation(validation, value, label);
      
          if (!["date", "datetime-local"].includes(type) && specialCharRegex.test(value)) {
            errorMessage = "Special characters are not allowed";
          } else if (formFieldvalidate !== 0 && formFieldvalidate !== undefined) {
            errorMessage = formFieldvalidate;
          }
      
          setFieldValidationErrors({ ...fieldValidationErrors, [name]: errorMessage });
        };
      
        const handleChange = (e) => {
          const { value } = e.target;
          validateData(value); // Validate input on change
          // Update deviceData state
          setDeviceData((prevData) => ({ ...prevData, [name]: value }));
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
            <input
              required
              className="approval-select-form-text-inputs"
              name={name}
              type={type}
              value={deviceData[name]}
              onChange={handleChange}
            />
          </div>
        );
      };
      
      
   

      const selectFormField = (label, name, star, options = [], defaultValue) => {
        const validateSelectData = () => {
          if (!deviceData[name]) {
            setFieldValidationErrors({ ...fieldValidationErrors, [name]: `${label} is required` });
          } else {
            const newState = { ...fieldValidationErrors };
            delete newState[name];
            setFieldValidationErrors(newState);
          }
        };
      
        const handleChange = (e) => {
          const { value } = e.target;
          // Clear error message when a value is selected
          if (fieldValidationErrors[name]) {
            const newErrors = { ...fieldValidationErrors };
            delete newErrors[name];
            setFieldValidationErrors(newErrors);
          }
          // Update deviceData state
          setDeviceData((prevData) => ({ ...prevData, [name]: value }));
        };
      
        return (
          <div key={name} className="form-groups">
             {!fieldValidationErrors?.[name] ? <label className="form-labels">
                        {label}<sup>{star}</sup>
                        </label>: <label style={{color:"red", fontSize:"9px"}}><b>{fieldValidationErrors[name]}</b></label>}
            <select
              required
              className="form-inputs"
              name={name}
              onChange={handleChange}
              onBlur={validateSelectData}
              value={deviceData[name]}
            >
              <option value="">Select</option>
              {Array.isArray(options) &&
                options.map((option) => (
                  <option key={option.authId} value={option.entitycode}>
                    {option.entityName}
                  </option>
                ))}
            </select>
          </div>
        );
      };
      
      const selectFeild1 = (label, name, star) => {  
        const validateSelectField1 = () => {
          if (!deviceData[name]) {
            setFieldValidationErrors({ ...fieldValidationErrors, [name]: `${label} is required` });
          } else {
            const newState = { ...fieldValidationErrors };
            delete newState[name];
            setFieldValidationErrors(newState);
          }
        };
       
        const onChange = (e) => {  // Corrected the function name to `onChange`
          const { value } = e.target;
          // Clear error message when a value is selected
          if (fieldValidationErrors[name]) {
            const newErrors = { ...fieldValidationErrors };
            delete newErrors[name];
            setFieldValidationErrors(newErrors);
          }
          // Update deviceData state
          setDeviceData((prevData) => ({ ...prevData, [name]: value }));
        };
       
        return (
          <div key={name} className="form-groups">
            {!fieldValidationErrors?.[name] ? <label className="form-labels">
                        {label}<sup>{star}</sup>
                        </label>: <label style={{color:"red", fontSize:"9px"}}><b>{fieldValidationErrors[name]}</b></label>}
            <select
              required
              className="form-inputs"
              name={name}
              onChange={onChange}  // Changed the event handler name here
              onBlur={validateSelectField1}
              value={deviceData[name]}
            >
              <option value="">Select</option>
              <option value="0">False</option>
              <option value="1">True</option>
            </select>
          </div>
        );
      };
      
      const getFileUrl = async (docname) => {
        const fileUrl = await getDocumentFullUrl(docname)
        return fileUrl;
      }
    
      const fileUploadUI = (label, name, type, star) => {
        const handleFileUpload = async (e, docname) => {
          const file = e.target.files[0];
      
          if (file) {
            const response = await uploadDocDeviceApproval(file, docname);
            setUploadedFiles({
              ...uploadedFiles,
              [docname]: response.filename
            });
            // Clear the error message when a file is uploaded
            setFieldValidationErrors(prevErrors => {
              const newState = { ...prevErrors };
              delete newState[name];
              return newState;
            });
          }
        };
      
        const validateFileUpload = () => {
          if (!uploadedFiles[name]) {
            setFieldValidationErrors({
              ...fieldValidationErrors,
              [name]: `Please upload ${label}`
            });
          }
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
            <input
              required
              className="form-inputs"
              name={name}
              type={type}
              onChange={(e) => handleFileUpload(e, name)}
              onBlur={validateFileUpload}
            />
          </div>
        );
      };
      

    const contentView = (name = '', value = '', file = false, isDate = false, type = '') => {
        let docname = '';

        if (['ddDet', 'fileUploadProtocolSpec', 'tacCertificate', 'copCertificate'].includes(name)) {
          const parsedValue = JSON.parse(value);
          docname = parsedValue && parsedValue.docname ? parsedValue.docname : '';
          console.log(docname);

          return (
            <>
              <div className={`table-card-cell ${type == 'full' && ' full_width'}`}>
                <span className="table-card-key sub-heading">{name} </span>
                {/* <a href={docname} download={`${name}.png`} target='blank' rel='noreferrer'> */}
                  {docname &&<button style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }} onClick={async () => window.open(await getFileUrl(docname), '_blank')}>View</button>}
                {/* </a> */}
              </div>
            </>
          )
        } else {
          return (
            <>
              {!Array.isArray(value) && <div className={`table-card-cell ${type == 'full' && ' full_width'}`}>
                <span className="table-card-key sub-heading">{name} </span>
                <div className="table-card-value text">{isDate ? indianDate(value) : nullToNA(value)}</div>
              </div>}
            </>
          )
        }
      }
    

    return (
        <>
        <p className="form-heading-para">ADD DEVICE APPROVAL</p>
        <div  className="approval-form-container">  
            {isLoading ? <LoadingWidget /> : 
            uploadedDeviceDetail ? <div className='id_top_container' style={{backgroundColor:"white",padding:"10px",borderRadius:"8px"}}>{Object?.keys(uploadedDeviceDetail)?.map((key, index) =>
                contentView(
                  key, 
                  uploadedDeviceDetail[key], 
                  ['copCertificate', 'fileUploadProtocolSpec', 'fileUploadTechnicalSpec', 'tacCertificate', 'ddDet'].includes(key),
                  ['copCertificateExpiry', 'copApprovalDate', 'approvedon', 'uploadedon', 'createdOn', 'tacApprovalDate', 'tacCertificateExpiry'].includes(key),
                  )
              )}
              
            </div> :
            <div>
                
                <div className = "form-tag">
                    <p className="approval-form-identifire-para">Device identifiers</p>
                    <div className="form-rows">
                        {formFieldUI("Model Code", "model_code", "text","*", "entity_code")}
                        {formFieldUI("Model Name", "model_name", "text","*", "entity_name")}
                        
                    </div>
                    <div className="form-rows">
                        {selectFeild1("Is IRNSS", "is_irnss","*")}
                        {selectFormField("Certifying Authority", "certifying_authority","*",approvingAuthorityList)}
                        {formFieldUI("Model Price", "device_fee", "number","*", "number")}
                    </div>
                    <p className="approval-form-identifire-para">TAC Certificate Details</p>
                    <div className="form-rows">
                        {formFieldUI("TAC Certificate No", "tac_certificate_no", "text","*", "text")}
                        {fileUploadUI("Upload TAC Certificate", "tac_certificate", "file","*")}
                    </div>
                    <div className="form-rows">
                        {formFieldUI("Approval Date", "tac_approval_date", "date","", "")}
                        {formFieldUI("Expiry Date", "tac_certificate_expiry", "date","", "")}
                    </div>
                    <p className="approval-form-identifire-para">COP Certificate Details</p>
                    <div className="form-rows">
                        {formFieldUI("COP Certificate No", "cop_certificate_no", "text","*", "text")}
                        {fileUploadUI("Upload COP Certificate", "cop_certificate", "file","*")}
                    </div>
                    <div className="form-rows">
                        {formFieldUI("Approval Date", "cop_approval_date", "date","", "")}
                        {formFieldUI("Expiry Date", "cop_certificate_expiry", "date","", "")}
                    </div>
                    <p className="approval-form-identifire-para">Permitted ESIM</p>
                    <div className="form-rows">
                      {esimProviderList ? (
                        <MultipleSelection
                          data={esimProviderList}
                          updateList = {setESIMProviderList}
                        />
                      ) : null}
                    </div>
                </div>

                <div className="form-submit-btn">
                    <button onClick={e=>handleSubmit(e)}>Save</button>
                </div>

            </div>}
         </div> 
        </>
    )
}




const MultipleSelection = ({data, updateList}) => {

    const [uiList, setUIList] = useState([])

    useEffect(() =>{
        if(data){
            const newData = data.map(item=>{
                item["isActive"] = false
                return item})
                console.log(newData);
            setUIList(newData)
        }
        
    },[])

    const onSelection = (selectedItem) => {
        const changedArray = uiList.map(item => {
            if(item["providerCode"] == selectedItem["providerCode"]){
                item["isActive"] = !item["isActive"]        
            }
            return item})
        setUIList(changedArray)
        updateList(changedArray.filter(item=>item["isActive"]===true))
    }


return (
  <div>
    {uiList.map(item => (
      <div key={item.id} className='roles-slection-container' >
        <label className='approval-roles-slection-label'>
          <input
            type="checkbox"
            checked={item.isActive}
            onChange={() => onSelection(item)}
            className='roles-slection-checkbo'
          />
          <span className="map-roles-text">{item.providerName}</span>
        </label>
      </div>
    ))}
  </div>
);

}
