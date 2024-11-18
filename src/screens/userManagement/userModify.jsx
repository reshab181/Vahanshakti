import './userAdd.css'
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStateBackendUserbyId } from "../../apis/users"
import { getRtoUserbyId, updateUserRTO } from "../../apis/rto";
import { getManfUserbyId, updateUserManufacture } from "../../apis/manufacture";
import { getDstUserbyId, updateUserDistributor } from "../../apis/distributor";
import { getPoliceUserbyId, updateUserPolice } from "../../apis/police";
import { updateUserAuthority, updateUserSua } from "../../apis/useradd";
import {getRFCUserbyId, updateUserRFC} from "../../apis/rfcMaster";
import { FormFieldValidation } from "../../components/fieldErrorValidation";
import Swal from 'sweetalert2';
import { LoadingWidget } from '../../components/loading';

export const ModifyUser = () => {
  
  const { id } = useParams()

  const navigate = useNavigate();
  const [userData, setUserData] = useState({designation:"custom"})
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);
  
  const [fieldValidationErrors, setFieldValidationErrors] = useState({})
  const [apiResponseError, setApiResponseError] = useState(null)

  
  
  // const [userDetails, setUserDetails] = useState(null)
  
  const loggedInUserType = sessionStorage.getItem('userType')
  // const eid = sessionStorage.getItem('entityId')


  const feedFormData = async () => {

    setIsLoading(true)

    let resp;

    if (loggedInUserType === "RTO") {
      resp = await getRtoUserbyId(id)
    } else if (loggedInUserType === "MNF") {
      resp = await getManfUserbyId(id)
    } else if (loggedInUserType === "DST") {
      resp = await getDstUserbyId(id)
    } else if (loggedInUserType === "POLICE") {
      resp = await getPoliceUserbyId(id)
    } else if (loggedInUserType === "RFC") {
      resp = await getRFCUserbyId(id)
    } else if (loggedInUserType === "SUA" || loggedInUserType === "SBU") {
      resp = await getStateBackendUserbyId(id)
    }

    if (resp?.status == true) {

      // setUserDetails(resp?.result)
      console.log(resp?.result, "resp?.result")
      setSelectedRoles(resp?.result?.roleLists.filter(item=>item?.value===1))

      let details = resp?.result;
      console.log(details, "detailsSetUserData")  
      setUserData({
        designation: details?.designation,
        emailId: details?.emailid,
        fullname: details?.fullname,
        userName: details?.username,
        username: details?.username,
        contactNo: details?.contactNo,
        password: details?.password || "12345",
      })

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Unable to get details'
      })
      navigate('/userManagement/listUser')
    }

    setIsLoading(false)
  }


  useEffect(() => {
    if (id) {
      feedFormData();
    }
  }, [id]);
  

  


  const onChange = async (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }
  
  const handleSubmit = async (e) => {

    e.preventDefault();
    const uploadData = { ...userData };
    
    let requiredVariables
    requiredVariables = ["designation", "emailId", "fullname", "userName", "contactNo"]
    
    const checkSubmitError = {}
    for (let item of requiredVariables) {
      if (!(item in uploadData)) {
        const errorItem = item + " value is required"
        checkSubmitError[item] = errorItem
      }
    }

    setFieldValidationErrors({ ...fieldValidationErrors, ...checkSubmitError })
    if (Object.values(fieldValidationErrors).filter(item => item !== undefined).length == 0) {

      uploadData["entityId"] = parseInt(sessionStorage.getItem("entityId"));
      uploadData["parentId"] = parseInt(sessionStorage.getItem("parentId"));
      uploadData["status"] = 1;

      uploadData["roleLists"] = selectedRoles.map((item) => ({
        id: item.id,
        code: item.code,
        name: item.name,
        value: item.value,
      }));

      setIsLoading(true)

      let response;

      if (loggedInUserType === "RTO") {
        response = await updateUserRTO({ userid: parseInt(id), ...uploadData });
      } else if (loggedInUserType === "MNF") {
        response = await updateUserManufacture({ userid: parseInt(id), ...uploadData });
      } else if (loggedInUserType === "RFC") {
        response = await updateUserRFC({ userid: parseInt(id), ...uploadData });
      } else if (loggedInUserType === "DST") {
        response = await updateUserDistributor({ userid: parseInt(id), ...uploadData });
      } else if (loggedInUserType === "POLICE") {
        response = await updateUserPolice({ userid: parseInt(id), ...uploadData });
      } else if (loggedInUserType === "SUA" || loggedInUserType === "SBU") {
        response = await updateUserSua({ userid: parseInt(id), ...uploadData });
      } else if (loggedInUserType === "AUTH") {
        response = await updateUserAuthority({ userid: parseInt(id), ...uploadData });
      }


      if (response?.status == true) {
        
          navigate("/userManagement/listUser")
        
        Swal.fire({
          icon: 'success',
          title: '',
          text: `Updated Successfully`
        })
      } else {
        setApiResponseError(response?.message)
        setTimeout(() => setApiResponseError(null), 30000);
      }
      setIsLoading(false);

    }
  };

  const handleDeactivate = async (e) => {

    e.preventDefault();
    const uploadData = { ...userData };
    console.log("handleDeactivate", uploadData)
    uploadData["entityId"] = parseInt(sessionStorage.getItem("entityId"));
    uploadData["parentId"] = parseInt(sessionStorage.getItem("parentId"));
    uploadData["status"] = 1;
    uploadData["roleLists"] = selectedRoles.map((item) => ({
    id: item.id,
    code: item.code,
    name: item.name,
    value: item.value,
    }));

    setIsLoading(true)

    let response;
    console.log(uploadData, "uploadUserModifyData")
    if (loggedInUserType === "RTO") {
    response = await updateUserRTO({ userid: parseInt(id), ...uploadData });
    } else if (loggedInUserType === "MNF") {
    response = await updateUserManufacture({ userid: parseInt(id), ...uploadData });
    } else if (loggedInUserType === "DST") {
    response = await updateUserDistributor({ userid: parseInt(id), ...uploadData });
    } else if (loggedInUserType === "POLICE") {
    response = await updateUserPolice({ userid: parseInt(id), ...uploadData });
    } else if (loggedInUserType === "SUA" || loggedInUserType === "SBU") {
    response = await updateUserSua({ userid: parseInt(id), ...uploadData });
    } else if (loggedInUserType === "AUTH") {
    response = await updateUserAuthority({ userid: parseInt(id), ...uploadData });
    }


    if (response?.status == true) {
    
    navigate("/userManagement/listUser")
    
    Swal.fire({
        icon: 'success',
        title: '',
        text: `User Deactivated Successfully`
    })
    } else {
    setApiResponseError(response?.message)
    setTimeout(() => setApiResponseError(null), 30000);
    }
    setIsLoading(false);
};


  const formFields = (label, name, type, star = "", validation = "text", disabled = false) => {

    const validateData = () => {

      const formFieldvalidate = FormFieldValidation(validation, userData[name], label)
      if (formFieldvalidate !== 0 && formFieldvalidate !== undefined) {
        setFieldValidationErrors({ ...fieldValidationErrors, [name]: formFieldvalidate })
      } else {
        const newState = { ...fieldValidationErrors };
        delete newState[name];
        setFieldValidationErrors(newState);
      }
    }

    return (
      <div style={{ width: "100%" }}>
        <div key={name} className="field_wrapper">
          {!fieldValidationErrors?.[name] ? <label className="form-labels">
            {label}<sup>{star}</sup>
          </label> : <label style={{ color: "red", fontSize: "9px" }}><b>{fieldValidationErrors[name]}</b></label>}
          <input
            style={{ backgroundColor: disabled ? 'rgba(0,0,0,0.1)' : '' }}
            required
            className=""
            name={name}
            type={type}
            disabled={disabled}
            value={userData[name]}
            onChange={(e) => {onChange(e)}}
            onBlur={() => validateData()}
          />
        </div>
      </div>
    );
  };

  return (
    <>

      {
        (isLoading) && <LoadingWidget />
      }

      {
        (!isLoading) &&
        <>
          <p className="form_header">{id ? 'Update' : 'Add'} User</p>
          <div className="form_container">
            <div className="form_left">
              {apiResponseError ? <p style={{ padding: "10px", backgroundColor: "red", color: "white", marginBottom: "5px", borderRadius: "5px" }}><b>{apiResponseError}</b></p> : null}
              <p className="form_subheading">User identifiers</p>

              {formFields("Designation", "designation", "text", "*", "entity_name", true)}
              {formFields("Email ID", "emailId", "text", "*", "email")}
              {formFields("Full Name", "fullname", "text", "*", "entity_name")}
              {formFields("User Name", "userName", "text", "*", "entity_name")}
              {formFields("Contact No", "contactNo", "text", "*", "phone")}
            </div>

            <div className="form_right">
              <p className='form_subheading'>Map Roles</p>
              <p  className="form_subheading_note">Note : This is not Editable Roles.</p>
              
            <>
                {selectedRoles?.map((role) => (
                <div key={role.id} className={`field_wrapper field_wrapper_row checkbox_container green_checkbox`}>
                    <div className="checkbox-wrapper-26">
                    <input type="checkbox" id={`_checkbox-${role.id}`} name={role.code}/>
                    </div>
                    <label htmlFor={`_checkbox-${role.id}`} className='' style={{ cursor: 'pointer',fontSize:"13px" }} >
                    {role.name}
                    </label>
                </div>
                ))}
            </>
            
            
            </div>

            <div>

            <div style={{display:"flex"}}>
            <div className="button_wrapper">
                <button className="form_button button_submit" style={{ padding: '5px 20px' }} onClick={(e) => handleSubmit(e)}>Update</button>
            </div>
            <div className="button_wrapper">
                <button className="form_button button_submit" style={{ padding: '5px 20px', backgroundColor: "red" }} onClick={(e) => handleDeactivate(e)}>Deactivate</button>
            </div>

            </div>        
            
            </div>

          </div>
        </>
      }
    </>
  );

};