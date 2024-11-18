import { useState, useEffect } from "react";
import { AddUser } from "../userManagement/userAdd";
import { LoadingWidget } from "../../components/loading";
import { createManufacture, getManufactureDetailsById, updateManufacture } from "../../apis/manufacture";
import { FormFieldValidation } from "../../components/fieldErrorValidation";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export const AddManufacturer = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [userAddition, setUserAddition] = useState(false)
  const [manfData, setManfData] = useState({})
  const [manfId, setManfId] = useState(null)
  const [fieldValidationErrors, setFieldValidationErrors] = useState({})
  const [apiResponseError, setApiResponseError] = useState(null)
  const [mnfDetails, setMnfDetails] = useState(null)

  const fetchMnfData = async () => {

    setIsLoading(true)

    const response = await getManufactureDetailsById(id)

    setMnfDetails(response?.result[0])
    let details = response?.result[0];

    console.log("response mnf: ", details)

    setManfData({
      name: details?.entityName,
      code: details?.entitycode,
      kycgstpan: details?.kycgstpan,
      gstNo: details?.gstNo,
      address: details?.address,
      district: details?.district,
      areas: details?.areas,
      state: details?.state,
      pinCode: details?.pinCode,
      country: details?.country,
    })

    setIsLoading(false)

  }

  useEffect(() => {
    id && fetchMnfData()
  }, [id])

  const onChange = (e) => {
    setManfData({ ...manfData, [e.target.name]: e.target.value })
    if (e.target.name === 'gstNo') {
      const panValue = e.target.value.substring(2, 12);
      setManfData({
        ...manfData,
        gstNo: e.target.value,
        kycgstpan: panValue,
      });
    }
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    const requiredVariables = ["name", "code", "kycgstpan", "gstNo", "address", "district", "areas", "state", "pinCode", "country"]

    const checkSubmitError = { ...fieldValidationErrors }
    for (let item of requiredVariables) {
      if (!(item in manfData)) {
        const errorItem = item + " value is required"
        checkSubmitError[item] = errorItem
      }
    }

    setFieldValidationErrors({ ...checkSubmitError })
    if (Object.values(checkSubmitError).filter(item => item !== undefined).length == 0) {

      let parentId = sessionStorage.getItem("entityId");
      console.log(parentId);
      const uploadData = {
        name: manfData.name,
        code: manfData.code,
        kycgstpan: manfData.kycgstpan,
        gstNo: manfData.gstNo,
        address: manfData.address,
        district: manfData.district,
        areas: manfData.areas,
        state: manfData.state,
        pinCode: parseInt(manfData.pinCode),
        country: manfData.country,
        // addressType: manfData.addressType,
        parentId: parseInt(parentId),
        addressType: "Office",
      };

      console.log(uploadData);

      let response;

      if (id) {
        response = await updateManufacture({ id: parseInt(mnfDetails?.id), ...uploadData, status: parseInt(mnfDetails?.status) });
      } else {
        response = await createManufacture(uploadData);
      }
      // Show success message when status is true
      if (response.status) {
        setManfId(response.mnfid);
        Swal.fire({
          icon: "success",
          title: '',
          text: response?.message,
        });
        if (id) {
          navigate('/manufacturers/listManufacturer')
        } else {
          setUserAddition(true);
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
      }
    }
  };


  const formFieldUI = (label, name, type, star = "", validation = "text", disableInput = false) => {

    const validateData = () => {
      console.log(validation, manfData[name], label, "check form validation")
      const formFieldvalidate = FormFieldValidation(validation, manfData[name], label)
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
          style={{ backgroundColor: disableInput ? 'rgba(0,0,0,0.1)' : '' }}
          required
          className="form-inputs"
          name={name}
          type={type}
          value={manfData[name]}
          onChange={(e) => onChange(e)}
          onBlur={() => validateData()}
          disabled={disableInput}
        ></input>

      </div>
    );
  };


  return (
    <>
      <p className="form-heading-para">{id ? "UPDATE" : "ADD"} MANUFACTURER</p>
      <div className="form-container">
        {userAddition ? (
          <AddUser
            userType="MNF"
            navigateto={"/manufacturers/listManufacturer"}
            entityId={manfId}
          />
        ) : isLoading ? (
          <LoadingWidget />
        ) : (
          <div>
            <div className="form-tag">
              {apiResponseError ? <p style={{ padding: "10px", backgroundColor: "red", color: "white", marginBottom: "5px", borderRadius: "5px" }}><b>{apiResponseError}</b></p> : null}
              <p className="form-identifire-para">Manufacturer identifiers</p>
              <div className="form-rows">
                {formFieldUI("Manufacturer Code", "code", "text", "*", "entity_code", id ? true : false)}
                {formFieldUI("Manufacturer Name", "name", "text", "*", "entity_name")}
                {formFieldUI("GST Number", "gstNo", "text", "*", "gstn")}
                {formFieldUI("Pan Number", "kycgstpan", "text", "*", "pan")}
              </div>
              <p className="form-identifire-para">Address Details</p>
              <div className="form-rows">
                {/* {formFieldUI("Address Type", "addressType", "text", "*", "text")} */}
                {formFieldUI("Address", "address", "text", "*", "text")}
                {formFieldUI("Locality", "areas", "text", "*", "text")}
              </div>
              <div className="form-rows">
                {formFieldUI("Pin Code", "pinCode", "text", "*", "pincode")}
                {formFieldUI("District", "district", "text", "*", "entity_name")}
                {formFieldUI("State", "state", "text", "*", "entity_name")}
                {formFieldUI("Country", "country", "text", "*", "entity_name")}
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
