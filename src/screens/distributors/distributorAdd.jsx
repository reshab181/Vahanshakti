import { useState, useEffect } from "react";
import { AddUser } from "../userManagement/userAdd";
import { LoadingWidget } from "../../components/loading";
import { createDistributor, getDistributorsDetailsById, updateDistributor, uploadDocDistributor } from "../../apis/distributor";
import { getAllManufacturer, getDocumentFullUrl } from "../../apis/manufacture";
import { FormFieldValidation } from "../../components/fieldErrorValidation";
import { useNavigate, useParams } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import Swal from "sweetalert2";
import { FiCheckCircle } from "react-icons/fi";
import { GrCloudUpload } from "react-icons/gr";
import { RotatingLines } from "react-loader-spinner";

export const AddDistributor = () => {

  let userType = sessionStorage.getItem("userType")

  const { id } = useParams()
  const navigate = useNavigate()

  const [distributorData, setDistributorData] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [userAddition, setUserAddition] = useState(false);
  const [documentAddition, setDocumentAddition] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [entityId, setEntityId] = useState(0);
  const [fieldValidationErrors, setFieldValidationErrors] = useState({})
  const [apiResponseError, setApiResponseError] = useState(null)
  const [distDetails, setDistDetails] = useState(null)
  const [errorFiles, setErrorFiles] = useState(["document1", "document2", "document3"])
  const [fileLoader, setFileLoader] = useState('')

  const onChange = (e) => {
    setDistributorData({ ...distributorData, [e.target.name]: e.target.value })
  }

  const fetchDistDetails = async () => {

    setIsLoading(true)

    const response = await getDistributorsDetailsById(id);

    let details = response?.result[0];

    setDistDetails(response?.result[0])

    console.log(details, "Distributor Details")
    setDistributorData({
      code: details?.entitycode,
      name: details?.entityName,
      kycgstpan: details?.kycgstpan,
      address: details?.address,
      pinCode: details?.pinCode,
      district: details?.district,
      state: details?.state,
    })


    setIsLoading(false)
    
  }

  useEffect(() => {
  
    if (id) {
      fetchDistDetails()
    }
  }, [id]);



  const handleFileUpload = async (e, docname, fileName) => {

    const file = e.target.files[0];
    console.log(docname, "docName")
    if (file) {
      try {
        setFileLoader(docname)
        const response = await uploadDocDistributor(file, docname);
        console.log(response, "file upload response")
        if (response?.status) {
          let files = errorFiles?.filter(item => item != docname)
          setErrorFiles(files)
          setUploadedFiles({
            ...uploadedFiles,
            [docname]: {
              doctype: fileName,
              docname: response.fileurl,
            },
          })
        }
        console.log("uploaded Documents", uploadedFiles)
        setFileLoader("")
      } catch (error) {
        console.error("Error uploading file:", error);
        setFileLoader("")
      }
    }
  };

  const checkError = (tag) => {
    let check = errorFiles?.includes(tag)
    return check
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    const requiredVariables = ["code", "name", "address", "pinCode", "district", "state"]

    const checkSubmitError = { ...fieldValidationErrors }
    for (let item of requiredVariables) {
      if (!(item in distributorData)) {
        const errorItem = item + " value is required"
        checkSubmitError[item] = errorItem
      }
    }

    setFieldValidationErrors({ ...checkSubmitError })

    if (Object.values(checkSubmitError).filter(item => item !== undefined).length == 0) {

      setIsLoading(true);
      const uploadData = {
        name: distributorData.name,
        code: distributorData.code,
        gstn: distributorData.gstn || null,
        pan: distributorData.pan || null,
        address: distributorData.address,
        district: distributorData.district,
        state: distributorData.state,
        pinCode: parseInt(distributorData.pinCode),
      };
      console.log("uploadData", uploadData);

      let response;

      if (id) {
        response = await updateDistributor({ id: parseInt(id), ...uploadData, status: distDetails?.status });
      } else {
        response = await createDistributor(uploadData);
      }

      if (response.status) {
        setEntityId(response.distid)
        console.log(response, "Distributor Creation Response ")
        Swal.fire({
          icon: "success",
          title: '',
          text: response?.message,
        });
        if (id) {
          navigate('/distributors/listDistributor')
        } else {
          setUserAddition(true)
        }
        setIsLoading(false);
      } else {
        Swal.fire({
          icon: "error",
          title: '',
          text: response?.message,
        });
        setApiResponseError(response?.message)
        setTimeout(() => setApiResponseError(null), 30000);
        setIsLoading(false);
      }
    }
  }


  console.log(distributorData, "distributorData")

  const formFieldUI = (label, name, type, star = "", validation = "text", disabled = false) => {
    const validateData = () => {

      const formFieldvalidate = FormFieldValidation(validation, distributorData[name], label)
      if (formFieldvalidate !== 0 && formFieldvalidate !== undefined) {
        setFieldValidationErrors({ ...fieldValidationErrors, [name]: formFieldvalidate })
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
        </label> : <label style={{ color: "red", fontSize: "9px" }}><b>{fieldValidationErrors[name]}</b></label>}
        <input
          style={{ backgroundColor: disabled ? 'rgba(0,0,0,0.1)' : '' }}
          required
          className="form-inputs"
          disabled={disabled}
          name={name}
          type={type}
          value={distributorData[name]}
          onChange={(e) => onChange(e)}
          onBlur={() => !(star === "" && distributorData[name]?.trim() === "") ? validateData() : setFieldValidationErrors(prevData=>{
            delete prevData?.[name]
            return prevData
          })}
        // onKeyUp={name === "pinCode" ? handlePincodeChange : undefined}
        ></input>

      </div>
    );
  };

  const getFileUrl = async (docname) => {
    const fileUrl = await getDocumentFullUrl(docname)
    return fileUrl;
  }

  const fileUploadUI = (label, name, type, star) => {
    return (
      <div key={name} className="form-groups" style={{ position: 'relative' }}>
        <label className="form-labels">{label}
          {!id && <sup>{star}</sup>}
          {!checkError(name) && <attr onClick={async () => window.open(await getFileUrl(uploadedFiles[name]?.docname), '_blank')} title="View" style={{ paddingLeft: '10px', cursor: 'pointer' }}><FaEye size={20} fill="#00f" /></attr>}
        </label>
        <div className="" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>

          <input
            required
            className="form-inputs"
            name={name}
            type={type}
            onChange={(e) => handleFileUpload(e, name, label)}
          />
          <span className="upload_status">
            {fileLoader == name ?
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
              :
              <>
                {
                  checkError(name) ? <span style={{ color: 'blue' }}><GrCloudUpload size={20} /></span> : <span style={{ color: 'green' }}><FiCheckCircle size={20} /></span>
                }
              </>
            }
          </span>
        </div>
      </div>
    );
  };

  
  return (
    <>
      <p className="form-heading-para">{id ? 'UPDATE' : 'ADD'} DISTRIBUTOR</p>
      <div className="form-container">
        {userAddition ? (
          <AddUser
            userType="DST"
            entityId={entityId}
            navigateto="/distributors/listDistributor"  
            
          />
        ) : isLoading ? (
          <LoadingWidget />
        ) : (
          <div>
            <div className="form-tag">
              {apiResponseError ? <p style={{ padding: "10px", backgroundColor: "red", color: "white", marginBottom: "5px", borderRadius: "5px" }}><b>{apiResponseError}</b></p> : null}
              <p className="form-identifire-para">Distributor identifiers</p>
              <div className="form-rows">
                
                {formFieldUI("Distributor Code", "code", "text", "*", "entity_code", id ? true : false)}
                {formFieldUI("Distributor Name", "name", "text", "*", "entity_name", id ? true : false)}
              </div>
              <p className="form-identifire-para">Address Details</p>
              <div className="form-rows">
                {formFieldUI("GSTN", "gstn", "text", "", "gstn")}
                {formFieldUI("PAN Number", "pan", "text", "", "pan")}
                {formFieldUI("Address", "address", "text", "*", "text")}
                
              </div>
              <div className="form-rows">
                {formFieldUI("District", "district", "text", "*", "entity_name")}
                {formFieldUI("State", "state", "text", "*", "entity_name")}
                {formFieldUI("Pin Code", "pinCode", "text", "*", "pincode")}
              </div>
              
              <div className="form-submit-btn">
                <button
                  className="btn btn-primary"
                  onClick={(e) => handleSubmit(e)}
                >
                  {id ? 'Update' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
