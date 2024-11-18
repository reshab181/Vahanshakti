import { useState, useEffect } from "react";
import { LoadingWidget } from "../../components/loading";
import { createApprovingAuthority, getApproveDetailsById,getApproveAuthorityDetailsById, updateApprovingAuthority } from "../../apis/masters";
import { useNavigate, useParams } from "react-router-dom";
import { FormFieldValidation } from "../../components/fieldErrorValidation";
import Swal from "sweetalert2";
import { AddUser } from "../userManagement/userAdd";

export const AddApprovingAuthority = () => {

  const { id } = useParams()
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [approvingAuthority, setApprovingAuthority] = useState({})
  const [fieldValidationErrors, setFieldValidationErrors] = useState({})
  const [apiResponseError, setApiResponseError] = useState(null)
  const [authorityData, setAuthorityData] = useState(null)
  const [userAddition, setUserAddition] = useState(false);
  const [entityId, setEntityId] = useState(0);

  const fetchAuthorityData = async () => {

    setIsLoading(true)

    const response = await getApproveAuthorityDetailsById(id)

    setAuthorityData(response?.result[0])
    let details = response?.result[0]

    setApprovingAuthority({
      authID: details?.id,
      authName: details?.entityName,
      authAddress: details?.address,
      authPincode: details?.pinCode,
      authDistrict: details?.district,
      state: details?.state,
    })

    setIsLoading(false)

  }

  useEffect(() => {
    if (id) {
      fetchAuthorityData()
    }
  }, [id])

  const onChange = (e) => {
    setApprovingAuthority({ ...approvingAuthority, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredVariables = ["authID", "authName", "authAddress", "authPincode", "authDistrict", "state"]

    const checkSubmitError = { ...fieldValidationErrors }
    for (let item of requiredVariables) {
      if (!(item in approvingAuthority)) {
        const errorItem = item + " value is required"
        checkSubmitError[item] = errorItem
      }
    }

    setFieldValidationErrors({ ...checkSubmitError })
    if (Object.values(checkSubmitError).filter(item => item !== undefined).length == 0) {

      let parentId = sessionStorage.getItem("entityId");

      setIsLoading(true);
      const uploadData = {
        code: String(approvingAuthority.authID),
        name: approvingAuthority.authName,
        address: approvingAuthority.authAddress,
        pinCode: parseInt(approvingAuthority.authPincode),
        district: approvingAuthority.authDistrict,
        state: approvingAuthority.state,
        parentId: parseInt(parentId),
      };

      let response;

      if(id){
        response = await updateApprovingAuthority({id: parseInt(authorityData?.id), createdBy: parseInt(authorityData?.createdBy), ...uploadData});
      } else {
        response = await createApprovingAuthority(uploadData);
      }

      console.log(response, "createApprovingAuthority")
      if (response?.status) {
        setEntityId(response.authid)
        Swal.fire({
          icon: "success",
          title: '',
          text: response?.message,
        });
      }

      if (id) {
        navigate('/masters/listApprovingAuthority')
      } else {
        setUserAddition(true)
      }


      // if (response?.status) {
      //   Swal.fire({
      //     icon: "success",
      //     title: '',
      //     text: response?.message,
      // });
      //   navigate("/masters/listApprovingAuthority");
      // } else {
      //   Swal.fire({
      //     icon: "error",
      //     title: '',
      //     text: response?.message,
      // });
      //   setApiResponseError(response?.message)
      //   setTimeout(() => setApiResponseError(null), 30000);
      // }

      setIsLoading(false);
    }
  };

  const formFieldUI = (label, name, type, star = "", validation = "text", disabled = false) => {
    const validateData = () => {

      const formFieldvalidate = FormFieldValidation(validation, approvingAuthority[name], label)
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
          type={type}
          value={approvingAuthority[name]}
          onChange={(e) => onChange(e)}
          onBlur={() => validateData()}
        ></input>

      </div>
    );
  };

  return (
    <>
      <p className="form-heading-para">{id? "UPDATE" : "ADD"} DEVICE AUTHORITY</p>
      <div className="form-container">
        {userAddition ? (
            <AddUser userType="AUTH" entityId={entityId} navigateto={"/masters/listApprovingAuthority"} />
        ) :isLoading ? (
          <LoadingWidget />
        ) : (
          <div>
            <div className="form-tag">
              {apiResponseError ? <p style={{ padding: "10px", backgroundColor: "red", color: "white", marginBottom: "5px", borderRadius: "5px" }}><b>{apiResponseError}</b></p> : null}
              <p className="form-identifire-para">
                Device Approving Authority Details
              </p>
              <div className="form-rows">
                {formFieldUI("Authority Code", "authID", "text", "*", "entity_code", id ? true : false)}
                {formFieldUI("Authority Name", "authName", "text", "*", "entity_name")}
              </div>
              <p className="form-identifire-para">Address Details</p>
              <div className="form-rows">
                {formFieldUI("Address", "authAddress", "text", "*", "text")}
                {formFieldUI("Pin Code", "authPincode", "text", "*", "pincode")}
              </div>
              <div className="form-rows">
                {formFieldUI("District", "authDistrict", "text", "*", "entity_name")}
                {formFieldUI("State", "state", "text", "*", "entity_name")}
              </div>
              
            </div>

            <div className="form-submit-btn">
              <button
                className="btn btn-primary"
                onClick={(e) => handleSubmit(e)}
              >
                {id? "Update" : "Save"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
