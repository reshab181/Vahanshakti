import { useState, useEffect } from "react";
import { LoadingWidget } from "../../components/loading";
import { createESIM, getESIMDetailsById, updateESIM, uploadDocESIM } from "../../apis/masters";
import { useNavigate, useParams } from "react-router-dom";
import { FormFieldValidation } from "../../components/fieldErrorValidation";
import { FaEye } from "react-icons/fa6";
import Swal from "sweetalert2";
import { FiCheckCircle } from "react-icons/fi";
import { GrCloudUpload } from "react-icons/gr";
import { RotatingLines } from "react-loader-spinner";
import { getDocumentFullUrl } from "../../apis/manufacture";

export const AddESIMProviders = () => {

  const { id } = useParams()
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [esimproviderData, setEsimProviderData] = useState({})
  const [fieldValidationErrors, setFieldValidationErrors] = useState({})
  const [apiResponseError, setApiResponseError] = useState(null)
  const [esimDetails, setEsimDetails] = useState(null)
  const [errorFiles, setErrorFiles] = useState(["document1", "document2", "document3", "apiDocument"])
  const [fileLoader, setFileLoader] = useState('')

  const fetchEsimData = async () => {

    setIsLoading(true)

    let response = await getESIMDetailsById(id)

    setEsimDetails(response?.result)
    let details = response?.result;
    let doc1 = JSON.parse(response?.result?.documents1);
    let doc2 = JSON.parse(response?.result?.documents2);
    let doc3 = JSON.parse(response?.result?.documents3);
    let apiDoc = JSON.parse(response?.result?.apiDocument);

    setEsimProviderData({
      providerCode: details?.providerCode,
      providerName: details?.providerName,
      providerGst: details?.gst,
      providerAddress: details?.address,
      providerDistrict: details?.district,
      providerPincode: details?.pincode,
      pocName: details?.pocName,
      pocPhone: details?.pocPhone,
      pocEmail: details?.pocEmail,
      document1: {
        doctype: doc1?.doctype,
        docname: `${doc1?.docname}`
      },
      document2: {
        doctype: doc2?.doctype,
        docname: `${doc2?.docname}`
      },
      document3: {
        doctype: doc3?.doctype,
        docname: `${doc3?.docname}`
      },
      apiDocument: {
        doctype: apiDoc?.doctype,
        docname: `${apiDoc?.docname}`
      },
    })

    setErrorFiles([])

    if (doc1 == null) {
      setErrorFiles(errorFiles => [...errorFiles, "document1"])
    }
    if (doc2 == null) {
      setErrorFiles(errorFiles => [...errorFiles, "document2"])
    }
    if (doc3 == null) {
      setErrorFiles(errorFiles => [...errorFiles, "document3"])
    }

    setIsLoading(false)

  }

  useEffect(() => {
    if (id) {
      fetchEsimData()
    }
  }, [id])

  const onChange = (e) => {
    setEsimProviderData({ ...esimproviderData, [e.target.name]: e.target.value })
  }

  const handleFileUpload = async (e, tag) => {
    setFileLoader(tag)
    const file = e.target.files[0];
    const docName = e.target.name
    const response = await uploadDocESIM(file);
    if (response?.status) {
      let files = errorFiles?.filter(item => item != tag)
      setErrorFiles(files)
      setEsimProviderData({ ...esimproviderData, [tag]: { "doctype": docName, "docname": response.filename } })
    }
    setFileLoader('')
    console.log(response, "file upload response")
  }

  const checkError = (tag) => {
    let check = errorFiles?.includes(tag)
    return check
  }

  const handleSubmit = async (e) => {

    if(errorFiles?.length > 0){
      Swal.fire({
        icon: "error",
        title: '',
        text: "Upload All Documents",
      });
      return;
    }

    e.preventDefault();

    const requiredVariables = ["providerCode", "providerName", "providerGst", "providerAddress", "providerPincode", "providerDistrict", "pocName", "pocPhone", "pocEmail"]

    const checkSubmitError = { ...fieldValidationErrors }
    for (let item of requiredVariables) {
      if (!(item in esimproviderData)) {
        const errorItem = item + " value is required"
        checkSubmitError[item] = errorItem
      }
    }

    setFieldValidationErrors({ ...checkSubmitError })
    if (Object.values(checkSubmitError).filter(item => item !== undefined).length == 0) {
      let parentId = sessionStorage.getItem("entityId");
      setIsLoading(true);

      const uploadData = {
        providerCode: esimproviderData.providerCode,
        providerName: esimproviderData.providerName,
        providerGst: esimproviderData.providerGst,
        providerAddress: esimproviderData.providerAddress,
        providerDistrict: esimproviderData.providerDistrict,
        providerPincode: parseInt(esimproviderData.providerPincode),
        pocName: esimproviderData.pocName,
        pocPhone: esimproviderData.pocPhone,
        pocEmail: esimproviderData.pocEmail,
        document1: esimproviderData.document1,
        document2: esimproviderData.document2,
        document3: esimproviderData.document3,
        apiDocument: esimproviderData.apiDocument,
        parentId: parseInt(parentId),
      };

      let response;

      if (id) {
        response = await updateESIM({ id: parseInt(esimDetails?.id), ...uploadData })
      } else {
        response = await createESIM(uploadData);
      }
      if (response?.status) {
        Swal.fire({
          icon: "success",
          title: '',
          text: response?.message,
        });
        navigate("/masters/listESIMProviders");
      } else {
        Swal.fire({
          icon: "error",
          title: '',
          text: response?.message,
        });
        setApiResponseError(response?.message)
        setTimeout(() => setApiResponseError(null), 30000);
      }
      setIsLoading(false);
    }
  };

  const formFieldUI = (label, name, type, star = "", validation = "text", disabled = false) => {

    const validateData = () => {

      const formFieldvalidate = FormFieldValidation(validation, esimproviderData[name], label)
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
          {label}{!id && <sup>{star}</sup>}
        </label> : <label style={{ color: "red", fontSize: "9px" }}><b>{fieldValidationErrors[name]}</b></label>}
        <input
          required
          style={{ backgroundColor: disabled ? 'rgba(0,0,0,0.1)' : '' }}
          disabled={disabled}
          className="form-inputs"
          name={name}
          type={type}
          value={esimproviderData[name]}
          onChange={(e) => onChange(e)}
          onBlur={() => validateData()}
        ></input>

      </div>
    );
  };

  const getFileUrl = async (docname) => {
    const fileUrl = await getDocumentFullUrl(docname)
    return fileUrl;
  }

  const fileUploadUI = (label, name, type, star, tag) => {
    return (
      <div key={name} className="form-groups" style={{ position: 'relative' }}>
        <label className="form-labels">
          {label}
          {!id && <sup>{star}</sup>}
          {!checkError(tag) && <attr onClick={async () => window.open(await getFileUrl(esimproviderData[tag]?.docname), '_blank')} title="View" style={{ paddingLeft: '10px', cursor: 'pointer' }}><FaEye size={20} fill="#00f" /></attr>}
        </label>
        {/* Select field for document type */}
        <div className="" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <input
            required
            className="form-inputs form-input"
            name={name}
            type={type}
            onChange={(e) => handleFileUpload(e, tag)} />
          <span className="upload_status">
            {fileLoader == tag ?
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
                  checkError(tag) ? <span style={{ color: 'blue' }}><GrCloudUpload size={20} /></span> : <span style={{ color: 'green' }}><FiCheckCircle size={20} /></span>
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
      <p className="form-heading-para">{id ? "UPDATE" : "ADD"} ESIM PROVIDER</p>
      <div className="form-container">
        {isLoading ? (
          <LoadingWidget />
        ) : (
          <div>
            <div className="form-tag">
              {apiResponseError ? <p style={{ padding: "10px", backgroundColor: "red", color: "white", marginBottom: "5px", borderRadius: "5px" }}><b>{apiResponseError}</b></p> : null}
              <p className="form-identifire-para">ESIM Provider identifiers</p>
              <div className="form-rows">
                {formFieldUI("ESIM Provider Code", "providerCode", "text", "*", "entity_code", id ? true : false)}
                {formFieldUI("ESIM Provider Name", "providerName", "text", "*", "entity_name")}
                {formFieldUI("Provider GST", "providerGst", "text", "*", "gstn")}
              </div>
              <p className="form-identifire-para">Address Details</p>
              <div className="form-rows">
                {formFieldUI("Provider Address", "providerAddress", "text", "*", "text")}
              </div>
              <div className="form-rows">
                {formFieldUI("District", "providerDistrict", "text", "*", "entity_name")}
                {formFieldUI("Provider PinCode", "providerPincode", "text", "*", "entity_name")}
              </div>
              <p className="form-identifire-para">Contact details</p>
              <div className="form-rows">
                {formFieldUI("Name", "pocName", "text", "*", "entity_name")}
                {formFieldUI("Contact", "pocPhone", "text", "*", "phone")}
                {formFieldUI("Email", "pocEmail", "email", "*", "email")}
              </div>
              <p className="form-identifire-para">Document Upload</p>
              <div className="form-rows">
                {fileUploadUI("Registration Form", "registration_form", "file", "*", "document1")}
                {fileUploadUI("GST Certificate", "gstn", "file", "*", "document2")}
              </div>
              <div className="form-rows">
                {fileUploadUI("Director KYC", "director_kyc", "file", "*", "document3")}
                {fileUploadUI("API Document", "api_document", "file", "*", "apiDocument")}
              </div>
            </div>

            <div className="form-submit-btn">
              <button onClick={(e) => handleSubmit(e)}>{id ? "Update" : "Save"}</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
