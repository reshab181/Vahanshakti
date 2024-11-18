import React, { useState, useEffect } from "react";
import {
  getAllApprovedDeviceUser,
  getDeviceApprovalByEID,
  uploadDocDeviceApproval,
} from "../../../apis/masters";
import { updateDD } from "../../../apis/deviceInventory";
import { FormFieldValidation } from "../../../components/fieldErrorValidation";
import "../../manufacturers/components/UploadDetaisMNF.css";
import {
  indianDate,
  nullToNA,
} from "../../../components/Common/PowerUpFunctions";
import { BankNames } from "../../../constants/BanksList";
import Swal from "sweetalert2";
import { getDocumentFullUrl } from "../../../apis/manufacture";
import { RotatingLines } from "react-loader-spinner";


const DDDetailsEmplanment = ({manufacturerData, updateManufacturerData}) => {
  const userType = sessionStorage.getItem("userType");

  const [uploadedDevice, setUploadedDevice] = useState(null);

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [fieldValidationErrors, setFieldValidationErrors] = useState({});
  const [apiResponseError, setApiResponseError] = useState(null);
  const [docnameURL, setDocnameURL] = useState(null);
  const [isDocnameURLSet, setIsDocnameURLSet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [presignedUrl, setPresignedUrl] = useState(null);

  useEffect(() => {
    const fetchApprovalDevices = async () => {
      setIsLoading(true);
      if (userType === "SBU" || userType === "SUA") {
        console.log(manufacturerData);
        const response = await getDeviceApprovalByEID(manufacturerData?.id);
        setUploadedDevice(response[0]);

      }
      
      if (userType === "MNF") {
        const response = await getAllApprovedDeviceUser();
        console.log(response[0], "fetched Device from MNF");
        setUploadedDevice(response[0]);
      }

      setIsLoading(false);
    };
    fetchApprovalDevices();
  }, [manufacturerData]);

  useEffect(() => {
    if (uploadedDevice && uploadedDevice.ddDet && !isDocnameURLSet) {
      const ddDetails = JSON.parse(uploadedDevice.ddDet);
      console.log(ddDetails, "ddDetails")
      const docnameURLs = ddDetails.docname;
      setDocnameURL(docnameURLs);
      setIsDocnameURLSet(true);
    }
  }, [uploadedDevice, isDocnameURLSet]);

  

  useEffect(() => {
    if (presignedUrl) {
      window.open(presignedUrl, "_blank");
      // Reset the presignedUrl state after opening the document
      setPresignedUrl(null);
    }
  }, [presignedUrl]);

  
  const onChange = async (e) => {
    const { name, type } = e.target;

    // Check if the input type is a file
    if (type === "file") {
      const file = e.target.files[0];

      // Check file format
      if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
        setApiResponseError("Only JPG format is allowed for DD photo");
        // Clear field validation errors for 'docname' if present
        const updatedFieldValidationErrors = { ...fieldValidationErrors };
        delete updatedFieldValidationErrors["docname"];
        setFieldValidationErrors(updatedFieldValidationErrors);
        return;
      }

      setIsUploading(true);
      // Upload the file and update form data
      const uploadResponse = await uploadDocDeviceApproval(file);
      console.log(uploadResponse, "upload dd details");
      setIsUploading(false);
      if (uploadResponse.status) {
        setFormData({
          ...formData,
          ["docname"]: uploadResponse.fileurl || "",
        });
        setApiResponseError(null); // Clear previous error message
        // Clear field validation errors for 'docname' if present
        const updatedFieldValidationErrors = { ...fieldValidationErrors };
        delete updatedFieldValidationErrors["docname"];
        setFieldValidationErrors(updatedFieldValidationErrors);
      } else {
        setApiResponseError(uploadResponse.status);
      }
    } else if (name === "ddno") {
      const value = e.target.value;
      if (/[^a-zA-Z0-9\s]/.test(value)) {
        setApiResponseError(
          "Special characters are not allowed in DD number field"
        );
        return;
      }
      setFormData({
        ...formData,
        [name]: value,
      });
      setApiResponseError(null);
    } else {
      const value = e.target.value;
      setFormData({
        ...formData,
        [name]: value,
      });
      setApiResponseError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredVariables = ["ddno", "bank", "dddate", "docname"];

    const checkSubmitError = { ...fieldValidationErrors };
    for (let item of requiredVariables) {
      if (!(item in formData)) {
        const errorItem = item + " value is required";
        checkSubmitError[item] = errorItem;
      }
    }

    setFieldValidationErrors({ ...checkSubmitError });

    if (
      Object.values(checkSubmitError).filter((item) => item !== undefined)
        .length == 0
    ) {
      const apiData = {
        dd_details: {
          ddno: formData.ddno,
          bank: formData.bank,
          dddate: formData.dddate,
          doctype: "DD_IMAGE",
          docname: formData.docname,
        },
        model_code: uploadedDevice?.modelCode,
      };

      try {
        const response = await updateDD(apiData);
        if (response.status) {
          await updateManufacturerData()
          console.log(response, "DD Status Uploaded");
          Swal.fire({
            icon: "success",
            title: "DD Status! Uploaded",
            text: `Please complete rest of the onboarding process`,
          });
          
        } else {
          setApiResponseError(response?.message);
          setTimeout(() => setApiResponseError(null), 30000);
          console.error("API call failed:", response.message);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  
  const formFieldUI = (label, name, type, star = "", validation = "text") => {
    const validateData = () => {
      const formFieldvalidate = FormFieldValidation(
        validation,
        formData[name],
        label
      );
      if (formFieldvalidate !== 0 && formFieldvalidate !== undefined) {
        setFieldValidationErrors({
          ...fieldValidationErrors,
          [name]: formFieldvalidate,
        });
      } else {
        const newState = { ...fieldValidationErrors };
        delete newState[name];
        setFieldValidationErrors(newState);
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
        {type === "file" ? (
          <>
            <span style={{ display: "flex" }}>
              <input
                className="form-inputs"
                type={type}
                name={name}
                onChange={onChange}
              />
              {/* Render RotatingLines component when isUploading is true */}
              {isUploading && (
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
              }
            </span>
          </>
        ) : (
          <>
            <input
              required
              className="form-inputs"
              name={name}
              value={formData[name]}
              type={type}
              onChange={onChange}
              onBlur={() => validateData()}
            />
          </>
        )}
      </div>
    );
  };

  const selectFormField = (label, name, star) => {
    const validateSelectData = () => {
      if (!formData[name]) {
        // Check if the field value is empty
        setFieldValidationErrors({
          ...fieldValidationErrors,
          [name]: `${label} is required`,
        });
      } else {
        const newState = { ...fieldValidationErrors };
        delete newState[name];
        setFieldValidationErrors(newState);
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
        <select
          required
          className="form-inputs"
          name={name}
          onChange={(e) => onChange(e)}
          value={formData[name]}
          onBlur={validateSelectData}
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
          <div
            className="error-message"
            style={{ color: "red", fontSize: "13px" }}
          >
            {errors[name]}
          </div>
        )}
      </div>
    );
  };

  const ddDetailsUI = (setDocnameUR) => {
    const ddDetails = JSON.parse(uploadedDevice.ddDet);
    const docnameURLs = ddDetails.docname;
    // setDocnameUR(docnameURLs)
    console.log(docnameURL);

    return (
      <>
        <p className="emplament-heading">DD Details</p>
        <div
          className="id_top_container"
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          {Object?.keys(ddDetails)?.map((key, index) =>
            contentView(
              key,
              ddDetails[key],
              ["docname"].includes(key),
              ["dddate"].includes(key)
            )
          )}
          
        </div>
      </>
    );
  };

  const getFileUrl = async (docname) => {
    const fileUrl = await getDocumentFullUrl(docname);
    return fileUrl;
  };

  const mapData = {ddno: "DD Number",bank: "Bank Name", dddate:"DD Issue Date",doctype:"Document Type", docname:"Documnet Name"}
 
  const contentView = (
    name = "",
    value = "",
    file = false,
    isDate = false,
    type = ""
  ) => {
    if (file) {
      return (
        <>
          <div className={`table-card-cell ${type == "full" && " full_width"}`}>
            <span className="table-card-key sub-heading">{mapData[name]} </span>
            {/* <a href={docnameURL} download={`${name}.png`} target='blank' rel='noreferrer'>
              <button style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}>View</button>
            </a> */}
            <button
              style={{
                background: "none",
                border: "none",
                color: "blue",
                cursor: "pointer",
              }}
              onClick={async () =>
                window.open(await getFileUrl(docnameURL), "_blank")
              }
            >
              View
            </button>
          </div>
        </>
      );
    } else {
      return (
        <>
          {!Array.isArray(value) && (
            <div
              className={`table-card-cell ${type == "full" && " full_width"}`}
            >
              <span className="table-card-key sub-heading">{mapData[name]} </span>
              <div className="table-card-value text">
                {isDate ? indianDate(value) : nullToNA(value)}
              </div>
            </div>
          )}
        </>
      );
    }
  };

  return (
    <>
      {isLoading ? (
        <p>Loading.</p>
      ) : uploadedDevice &&
        uploadedDevice.ddDet &&
        JSON.parse(uploadedDevice.ddDet) ? ddDetailsUI() : 
        userType === "MNF" ? <div>
          <p className="emplament-heading">Demand Draft</p>
          <div
            className="form-container "
            style={{ margin: "0", padding: "15px" }}
          >
            <div>
              <div className="form-tag">
                {apiResponseError ? (
                  <p
                    style={{
                      padding: "10px",
                      backgroundColor: "red",
                      color: "white",
                      marginBottom: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    <b>{apiResponseError}</b>
                  </p>
                ) : null}
                <p className="form-identifire-para">Bank Details</p>
                <div className="form-rows">
                  {formFieldUI("DD no", "ddno", "number", "*", "text")}
                  {selectFormField("Bank Name", "bank", "*")}
                </div>
                <div className="form-rows">
                  {formFieldUI("Date", "dddate", "date", "*", "date_lt")}
                  {/* <FileUploadUI key={"docname"} label={row.documentTag} name = {row.documentId} onUpload={handleFileUpload}  initialFile={documentsUploaded?.[row.documentId]} layout={"rows"}/> */}
                  {formFieldUI("DD Photo", "docname", "file", "*")}
                </div>
              </div>
            </div>
          </div>

          {userType === "MNF" ? (
            <div className="saveNextEmplamentButton">
              <button onClick={(e) => handleSubmit(e)}>Save</button>
            </div>
          ) : null}
        </div> : <div style={{display: "flex", justifyContent:"center", backgroundColor:"white", padding:"20px"}}><p style={{color:"red"}}><b>No Demand Draft Details Uploaded Yet!!</b></p></div>
      }
    </>
  );
};

export default DDDetailsEmplanment;
