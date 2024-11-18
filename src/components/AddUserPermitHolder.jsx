import React, { useEffect, useState } from 'react'
import { BaseURL } from '../constants/baseURL';
import './common.css'
import { addUserPermit, getPermitHolderDefaultRoles } from '../apis/permit';
import Swal from 'sweetalert2';
import { fetchPincodeData } from '../constants/usePincodeFetch';

const AddUserPermitHolder = (props) => {
    // const [userData, setUserData] = useState('')
    const [error, setError] = useState(null)    
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [userData, setUserData] = useState({contactNo:props.mobileNumber,  username:props.mobileNumber});
    
    
    const getPermitHolderRoles = async () => {
      const defaultRoles = await getPermitHolderDefaultRoles()
      console.log(defaultRoles, "getPermitHolderRoles")
      setSelectedRoles(defaultRoles)
      
    }

    useEffect(()=>{
      getPermitHolderRoles()
    }, [])

    
    const validateData = (e) => {
        
        const requiredFields = ['fname', 'lname', 'username', 'address', 'pincode', 'emailId', 'contactNo', 'user_type'];
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        for (const field of requiredFields) {
          
          if (!userData[field]) {
            setError(`${field} Value is required`)
            return false;
          }
        }
        
        // Validate email format
        if (!emailRegex.test(userData['emailId'])) {
          setError("Invalid Email Address");
          return false;
        }
        
        return true;
      };

      const handleChange = async (e) => {
        const {name, value} = e.target;
        console.log(name,value);
 
        if(name==="pincode"){
          if(value.length === 6){
            const fetchDetails = await fetchPincodeData(value)
            console.log(fetchDetails, "pincode")
            setUserData({
              ...userData,
              [name]: value,
              "city": fetchDetails?.district,
              "state": fetchDetails?.state,
         
            });
          }
        } else {
          setUserData({
            ...userData,
            [name]: value,
          });
        }
            // Clear error message for the field being changed
        setError((prevError) => {
          if (prevError && userData[name]) {
              return null;
          }
          return prevError;
        });
      };

      
      const handleSubmit = async (e) => {
        e.preventDefault();
         
        // if(userData.password !== userData.confirmpassword){
        //   setError("Password and Confirm doesn't Match")
        //   return
        // }

        if (!validateData()) {
          return
        }
        const uploadData = { ...userData };
        uploadData["password"] = "123456"
        uploadData["confirmpassword"] = "123456"
        uploadData["entityId"] =parseInt(sessionStorage.getItem("entityId")) 
        uploadData["roleLists"] = selectedRoles.map(item=>{return {...item, value:1}})
        console.log(uploadData, "uploadedDatapermitHolderCreatin")
        try {
          const res = await addUserPermit(uploadData);
          if(res.status){

            Swal.fire({
              icon: 'success',
              title: '',
              text: `User Created Successfully`
            })
            props.changeCreateUser(false)
          }else{
            Swal.fire({
              icon: 'error',
              title: '',
              text: res.message
            })
          }
          console.log('User added successfully:', res);
        } catch (error) {
          console.error('Error adding user:', error);
        }
      };
      

    const formFields = (label, name, type, star = "", validation = "text", disabled = false) => {
    
        return (
          <div style={{ width: "100%" }}>
            <div key={name} className="field_wrapper">
              <label htmlFor="">{label}<sup>{star}</sup></label>
              <input
                style={{ backgroundColor: disabled ? 'rgba(0,0,0,0.1)' : '' }}
                required
                className=""
                name={name}
                type={type}
                disabled={disabled}
                value={userData[name]}
                onChange={handleChange}
                // onBlur={() => validateData()}
              />
            </div>
          </div>
        );
      };

      const selectField = (label, name, options, star) => {
        return (
          <div className="field_wrapper">
            <label>{label}<sup>{star}</sup></label>
            <select
              required
              name={name}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {options.map((option, index) => (
                <option key={index} value={option?.permitHolderTypeCode}>
                  {option?.permitHolderTypeLabel}
                </option>
              ))}
            </select>
          </div>
        );
      };
    
  const permitHolderTypes = [
    {
    permitHolderTypeCode:"TPT",
    permitHolderTypeLabel:"Transporter" 
    },
    {
      permitHolderTypeCode:"SCHOOL",
      permitHolderTypeLabel:"School" 
    },
    {
      permitHolderTypeCode:"RTC",
      permitHolderTypeLabel:"Road Transport Corporation" 
    }
] 

  return (
    <div>
    <br></br>
    <p><b>Add User in Permit Holder</b></p>   
    {error && <p style={{padding:"5px", backgroundColor:"red", color:"white", margin:"5px 0"}}><b>{error}</b></p>}
    <div>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"5px", margin:"10px 0"}}>
        {selectField("Permit Holder Type", "user_type", permitHolderTypes, "*")}
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"5px"}}>
        {formFields("First Name", "fname", "text", "*", "text")}
        {formFields("Last Name", "lname", "text", "*", "text")}
        {formFields("User Name", "username", "text", "*", "text", true)}
        {formFields("Address", "address", "text", "*", "email")}
        {formFields("Pin Code", "pincode", "number", "*", "number")}
        {formFields("District", "city", "text", "*", "phone", true)}
        {formFields("State", "state", "text", "*", "entity_name", true)}
        {formFields("Email ID", "emailId", "email", "*", "text")}
        {formFields("Contact No", "contactNo", "number", "*", "phone", true)}
        {/* {formFields("Password", "password", "text", "*", "text")}
        {formFields("Confirm Password", "confirmpassword", "text", "*", "text")} */}

      </div>
      <div className="button_wrapper">
        <button className="form_button button_submit" style={{ padding: '5px 20px' }} onClick={(e) => handleSubmit(e)}>Create</button>
        <button className="form_button button_submit" style={{ padding: '5px 20px', backgroundColor:"red", borderColor:"red" }} onClick={(e) => props.cancelComponent(false)}>Cancel</button>
      </div>
    </div>
  </div>
  )
}

export default AddUserPermitHolder

