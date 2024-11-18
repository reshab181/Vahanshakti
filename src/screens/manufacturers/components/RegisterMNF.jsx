import React, { useState } from 'react';
import { BsXLg } from "react-icons/bs";
import { registerMNF } from '../../../apis/manufacture';
import { FormFieldValidation } from "../../../components/fieldErrorValidation";
import Swal from 'sweetalert2';
import { LoadingWidget } from '../../../components/loading';
import ResponseScreen from '../../../components/Common/ResponseScreen';
import { fetchPincodeData } from '../../../constants/usePincodeFetch';
import BackButton from '../../../components/Common/BackButton';

const RegisterMNF = (props) => {

  const [formData, setFormData] = useState({});
  const [fieldValidationErrors, setFieldValidationErrors] = useState({})
  const [apiResponseError, setApiResponseError] = useState(null)
  const [loader, setLoader] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = async (e) => {
    const { name, value } = e.target;
    if(name==="pinCode"){
      if(value.length===6){
        const fetchDetails = await fetchPincodeData(value)
        setFormData({
          ...formData,
          [name]: value,
          "district": fetchDetails?.district,
          "state": fetchDetails?.state,
          "country": fetchDetails?.country
        });  
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
      
    } else if(name==="gstNo"){
      setFormData({
        ...formData,
        "gstNo": value,
        "pan":value?.substring(2, 12)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredVariables = ["firstName", "lastName", "entityName", "email", "phoneNo", "gstNo", "pinCode", "country", "state", "district", "areas", "address"]

    const checkSubmitError = { ...fieldValidationErrors }
    for (let item of requiredVariables) {
      if (!(item in formData)) {
        const errorItem = item + " value is required"
        checkSubmitError[item] = errorItem
      }
    }

    setFieldValidationErrors({ ...checkSubmitError })
    if (Object.values(checkSubmitError).filter(item => item !== undefined).length == 0) {

      const uploadData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        entityName: formData.entityName,
        pan: formData.pan,
        email: formData.email,
        phoneNo: formData.phoneNo,
        gstNo: formData.gstNo,
        pinCode: parseInt(formData.pinCode),
        country: formData.country,
        state: formData.state,
        district: formData.district,
        areas: formData.areas,
        address: formData.address,
        addressType: "Office"
      };

      try {
        setLoader(true)
        console.log(formData);
        const response = await registerMNF(uploadData);
        console.log("mnf registration reponse: ", response);
        if (response?.status === true) {
          setSuccess(true)
        } else if (response?.status === false) {

          await Swal.fire({
            icon: "error",
            title: "User with same phone / email / gst / pan exists",
            text: response?.message
          });
        } else {
          setApiResponseError(response?.message)
          setTimeout(() => setApiResponseError(null), 30000);
        }
      } catch (error) {
        console.error('API error:', error);
      } finally {
        setLoader(false)
      }
      
    }
  };

  const handleReset = (e) => {
    

    setFormData(prevData=>{return {}});
  }

  const formFieldUI = (label, type, star = "", name, validation = "text", disableInput = false) => {
    const validateData = () => {

      const formFieldvalidate = FormFieldValidation(validation, formData[name], label)
      if (formFieldvalidate !== 0 && formFieldvalidate !== undefined) {
        setFieldValidationErrors({ ...fieldValidationErrors, [name]: formFieldvalidate })
      } else {
        const newState = { ...fieldValidationErrors };
        delete newState[name];
        setFieldValidationErrors(newState);
      }

    }

    return (
      <div key={name} style={{ flex: 1 }} className="form-groups">
        {!fieldValidationErrors?.[name] ? <label className="form-labels">
          {label}<sup>{star}</sup>
        </label> : <label style={{ color: "red", fontSize: "10px" }}><b>{fieldValidationErrors[name]}</b></label>}
        <input
          required
          className="form-inputs"
          name={name}
          type={type}
          value={formData[name]}
          onChange={handleChange}
          onBlur={() => validateData()}
          disabled={disableInput}
        />
      </div>
    );
  };

  return (
    <>
      {
        loader && <LoadingWidget />
      }

      {success && <ResponseScreen close={() => setSuccess(false)} closeAction={() => props.closeRegisterForm()} heading={"MNF Registration"} message={"Registration Successfull."} />}

      {
        !success &&
        <>
          
          <div className="modal-content">
            <div style={{display:"flex", justifyContent:"space-between"}}>
              
              <div className="sub-nav">
              <p style={{fontSize:"21px"}}><b>Manufacture Registration</b></p>
                <BackButton />
              </div>
            </div>
            <div className="form-container">
              <form style={{maxWidth:"750px", margin:"2px auto"}}>
                <div className="form-tag">
                  {apiResponseError ? <p style={{ padding: "10px", backgroundColor: "red", color: "white", marginBottom: "5px", borderRadius: "5px" }}><b>{apiResponseError}</b></p> : null}
                  
                  <p><b>Business Information</b></p>
                  <div className="form-rows">
                    {formFieldUI("Entity Name", "text", "*", "entityName", "entity_name")}
                    {formFieldUI("Business Email", "text", "*", "email", "email")}
                  </div>
                  <div className="form-rows">
                    {formFieldUI("Business Mobile No", "text", "*", "phoneNo", "phone")}
                    {formFieldUI("GST No", "text", "*", "gstNo", "gstn")}
                    {formFieldUI("PAN No", "text", "*", "pan", "pan", true)}
                  </div>
                  <p><b>Personal Information</b></p>
                  <div className="form-rows">
                    {formFieldUI("First Name", "text", "*", "firstName", "entity_name")}
                    {formFieldUI("Last Name", "text", "*", "lastName")}
                  </div>
                  <p><b>Contact Information</b></p>
                  <div className="form-rows">
                    {formFieldUI("Address", "text", "*", "address", "text")}
                  </div>
                  <div className="form-rows">
                    {formFieldUI("Area", "text", "*", "areas", "entity_name")}
                    {formFieldUI("Pin Code", "text", "*", "pinCode", "pincode")}
                    
                  </div>
                  <div className="form-rows">
                    {formFieldUI("District", "text", "*", "district", "entity_name")}
                    {formFieldUI("State", "text", "*", "state", "entity_name")}
                    {formFieldUI("Country", "text", "*", "country", "entity_name")}
                    
                  </div>
                  
                </div>
                <div className="form-submit-btn">
                  <button style={{ marginRight: "20px", backgroundColor: "red", color: 'white' }} onClick={handleReset}>Reset</button>
                  <button onClick={(e) => handleSubmit(e)}>Submit</button>
                </div>
              </form>
            </div>
          </div>
        </>
      }

    </>
  )
}

export default RegisterMNF