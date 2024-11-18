import React, { useState, useEffect } from "react";
import { getApprovalDevice, updateDD } from "../../../apis/deviceInventory";
import { uploadDocDeviceApproval } from "../../../apis/masters";
import { FormFieldValidation } from "../../../components/fieldErrorValidation";
import { BankNames } from "../../../constants/BanksList";
import Swal from "sweetalert2";
import { indianDate, nullToNA } from "../../../components/Common/PowerUpFunctions";
import { RotatingLines } from "react-loader-spinner";

export const DdDetails = ({
  uploadedDeviceDetail = null,
  refreshDeviceDetail,
  setCurrentPanel,
  setColor1
}) => {
  const [formData, setFormData] = useState({});
  const [fieldValidationErrors, setFieldValidationErrors] = useState({});
  const [apiResponseError, setApiResponseError] = useState(null);
  const [docnameURL, setDocnameURL] = useState(null);
  const [isDocnameURLSet, setIsDocnameURLSet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null); 

  const model_code = sessionStorage.getItem("model_code");

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        if (!uploadedDeviceDetail) {
          const res = await getApprovalDevice(model_code);
          setSelectedDevice(res);
        }
      } catch (error) {
        console.error('An error occurred while fetching device details:', error);
      }
    };

    if (uploadedDeviceDetail && uploadedDeviceDetail.ddDet) {
      const ddDetails = JSON.parse(uploadedDeviceDetail.ddDet);
      const docnameURLs = ddDetails.docname;
      setDocnameURL(docnameURLs);
      setIsDocnameURLSet(true);
    }

    fetchDevice();
  }, [uploadedDeviceDetail, model_code]);

  const onChange = async (e) => {
    const { name, type } = e.target;

    if (type === "file") {
      const file = e.target.files[0];

      // Check file format
      if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
        setApiResponseError("Only JPG format is allowed for DD photo");
        return;
      }

      setIsUploading(true);
      const uploadResponse = await uploadDocDeviceApproval(file);
      if (uploadResponse.status) {
        setFormData({
          ...formData,
          ["docname"]: uploadResponse.fileurl || "",
        });
        setIsUploading(false);
        setApiResponseError(null); 
      } else {
        setIsUploading(false);
        setApiResponseError(uploadResponse.status);
      }
    } else {
      const value = e.target.value;
      if (name === "ddno" && /[^a-zA-Z0-9\s]/.test(value)) {
        setApiResponseError("Special characters are not allowed in DD number field");
        return;
      }
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

    const checkSubmitError = {};
    for (let item of requiredVariables) {
      if (!(item in formData) || formData[item] === "") {
        checkSubmitError[item] = `${item} value is required`;
      }
    }

    setFieldValidationErrors(checkSubmitError);

    if (Object.values(checkSubmitError).filter((item) => item !== undefined).length === 0) {
      const apiData = {
        dd_details: {
          ddno: formData.ddno,
          bank: formData.bank,
          dddate: formData.dddate,
          doctype: "DD_IMAGE",
          docname: formData.docname,
        },
        model_code: uploadedDeviceDetail?.modelCode,
      };

      try {
        const response = await updateDD(apiData);
        if (response.status) {
          Swal.fire({
            icon: "success",
            title: "DD Status Uploaded",
            text: "Please complete the rest of the device approval process",
          });
          refreshDeviceDetail(uploadedDeviceDetail?.modelCode);
          setCurrentPanel("device_commands");
          setColor1("enabledd");
        } else {
          setApiResponseError(response?.message);
          setTimeout(() => setApiResponseError(null), 3000);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  const formFieldUI = (label, name, type, star = "", validation = "text") => {
    const validateData = () => {
      const validationError = FormFieldValidation(validation, formData[name], label);
      if (validationError) {
        setFieldValidationErrors((prev) => ({ ...prev, [name]: validationError }));
      } else {
        setFieldValidationErrors((prev) => {
          const newState = { ...prev };
          delete newState[name];
          return newState;
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
        {type === "file" ? (
          <span style={{ display: "flex" }}>
            <input
              className="form-inputs"
              type={type}
              name={name}
              onChange={onChange}
            />
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
              />
            )}
          </span>
        ) : (
          <input
            required
            className="form-inputs"
            name={name}
            value={formData[name] || ""}
            type={type}
            onChange={onChange}
            onBlur={validateData}
          />
        )}
      </div>
    );
  };

  const selectFormField = (label, name, star) => {
    const validateSelectData = () => {
      if (!formData[name]) {
        setFieldValidationErrors({
          ...fieldValidationErrors,
          [name]: `${label} is required`,
        });
      } else {
        setFieldValidationErrors((prevState) => {
          const newState = { ...prevState };
          delete newState[name];
          return newState;
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
        <select
          required
          className="form-inputs"
          name={name}
          onChange={onChange}
          onBlur={validateSelectData}
          value={formData[name] || ""}
        >
          <option value="">Select</option>
          {BankNames.map((option) => (
            <option key={option.id} value={option.entitycode}>
              {option.entitycode}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const ddDetailsUI = () => {
    const ddDetails = JSON.parse(uploadedDeviceDetail.ddDet);
    const docnameURLs = ddDetails.docname;

    return (
      <>
        <p className="emplament-heading">DD Details</p>
        <div className="id_top_container" style={{ backgroundColor: "white", padding: "10px", borderRadius: "8px" }}>
          {Object.keys(ddDetails).map((key) => (
            <div key={key} style={{ display: "flex" }}>
              <p className="emplament-heading">{key}</p>
              <p className="emplament-heading">{nullToNA(ddDetails[key])}</p>
            </div>
          ))}
          <img
            className="emplament-heading"
            style={{
              height: "20px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
            src={docnameURLs}
            alt="dd-docs"
          />
        </div>
      </>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-section">
        {uploadedDeviceDetail ? ddDetailsUI() : <></>}
        {formFieldUI("DD Number", "ddno", "text", "*")}
        {selectFormField("Bank", "bank", "*")}
        {formFieldUI("DD Date", "dddate", "date", "*")}
        {formFieldUI("DD Upload", "docname", "file", "*")}
        <button className="form-submit" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default DdDetails;
