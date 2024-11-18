import React, { useState, useEffect, useRef } from "react";
import { createRTO, getRTODetailsById, updateRTO } from "../../apis/rto";
import { AddUser } from "../userManagement/userAdd";
import { LoadingWidget } from "../../components/loading";
import { FormFieldValidation } from "../../components/fieldErrorValidation";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export const AddRTO = () => {
  const [rtoData, setRTOData] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [userAddition, setUserAddition] = useState(false);
  const [entityId, setEntityId] = useState(0);
  const [fieldValidationErrors, setFieldValidationErrors] = useState({})
  const [apiResponseError, setApiResponseError] = useState(null)
  const [rtoDetails, setRtoDetails] = useState(null)

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {

    const fetchRtoDetails = async () => {
      setIsLoading(true)
      const response = await getRTODetailsById(id)
      let details = response?.result[0];
      setRtoDetails(response?.result[0])
      setRTOData({
        rtoCode: details?.entitycode,
        rtoName: details?.entityName,
        address: details?.address,
        district: details?.address,
        state: details?.state,
        pinCode: details?.pinCode,
      })
      setIsLoading(false)
    }
    
    if (id) {
      fetchRtoDetails()
    }
  }, [id])

  const onChange = (e) => {
    setRTOData({
      ...rtoData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredVariables = ["rtoCode", "rtoName", "address", "pinCode", "district", "state"]

    const checkSubmitError = {}
    for (let item of requiredVariables) {
      if (!(item in rtoData)) {
        const errorItem = item + " value is required"
        checkSubmitError[item] = errorItem
      }
    }

    setFieldValidationErrors({ ...fieldValidationErrors, ...checkSubmitError })
    if (Object.values(fieldValidationErrors).filter(item => item !== undefined).length == 0) {
      let parentId = sessionStorage.getItem('entityId')

      const uploadData = {
        rtoCode: rtoData.rtoCode,
        rtoName: rtoData.rtoName,
        address: rtoData.address,
        district: rtoData.district,
        state: rtoData.state,
        pinCode: parseInt(rtoData.pinCode),
        parentId: parseInt(parentId),
      };

      setIsLoading(true)

      let response;

      if (id) {
        response = await updateRTO({ id: parseInt(id), ...uploadData, status: parseInt(rtoDetails?.status) });
      } else {
        response = await createRTO(uploadData);
      }

      console.log(response)
      if (response?.status) {
        setEntityId(response.rtoid)
        Swal.fire({
          icon: "success",
          title: '',
          text: response?.message,
        });

        if (id) {
          navigate('/rtos/listRTO')
        } else {
          setUserAddition(true)
        }

        setIsLoading(false)

      } else {
        Swal.fire({
          icon: "error",
          title: '',
          text: response?.message,
        });
        setIsLoading(false)
        setApiResponseError(response?.message)
        setTimeout(() => setApiResponseError(null), 30000);
      }
    }
  };


  const formFieldUI = (label, name, type, star = "", validation = "text", disabled = false) => {

    const validateData = () => {

      const formFieldvalidate = FormFieldValidation(validation, rtoData[name], label)
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
          required
          style={{ backgroundColor: disabled ? 'rgba(0,0,0,0.1)' : '' }}
          disabled={disabled}
          className="form-inputs"
          name={name}
          value={rtoData[name]}
          type={type}
          onChange={(e) => onChange(e)}
          onBlur={() => validateData()}
        />
      </div>
    );
  };

  return (
    <>
      <p className="form-heading-para" >{id ? "UPDATE" : "ADD"} RTO</p>
      {userAddition ? (
        <AddUser userType="RTO" entityId={entityId} navigateto={"/rtos/listRTO"} />
      ) : isLoading ? (
        <LoadingWidget />
      ) : (
        <div className="form-container">
          {apiResponseError ? <p style={{ padding: "10px", backgroundColor: "red", color: "white", marginBottom: "5px", borderRadius: "5px" }}><b>{apiResponseError}</b></p> : null}
          <div>
            <div className="form-tag">
              <p className="form-identifire-para">RTO identifiers</p>
              <div className="form-rows">
                {formFieldUI("RTO Code", "rtoCode", "text", "*", "entity_code", id ? true : false)}
                {formFieldUI("RTO Name", "rtoName", "text", "*", "entity_name")}
              </div>
              <p className="form-identifire-para">Address Details</p>
              <div className="form-rows">
                {formFieldUI("Address", "address", "text", "*", "text")}
                {formFieldUI("Pin Code", "pinCode", "text", "*", "pincode")}
              </div>
              <div className="form-rows">
                {formFieldUI("District", "district", "text", "*", "entity_name")}
                {formFieldUI("State", "state", "text", "*", "entity_name")}
              </div>
            </div>
            <div className="form-submit-btn">
              <button onClick={(e) => handleSubmit(e)}>{id ? "Update" : "Save"}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};




