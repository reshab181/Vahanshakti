import { BaseURL } from '../constants/baseURL'
import { getSubEntityMapping, getUserRoles } from './users';

export const login = async (username, password) => {

    sessionStorage.clear()

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    };
    const response = await fetch(`${BaseURL}/UserLogin/userlogin`, requestOptions)
    const responseParsed = await response.json()
    console.log(responseParsed, "userloginresponse")
    
    if (responseParsed?.status) {
      
      sessionStorage.setItem('token', (responseParsed?.token))
      sessionStorage.setItem('access_token', (responseParsed?.access_token))
      sessionStorage.setItem("userType", responseParsed?.loginResp?.userType);
      sessionStorage.setItem("parentId", parseInt(responseParsed?.loginResp?.parentId)),
      sessionStorage.setItem("entityId", parseInt(responseParsed?.loginResp?.entityId)),
      sessionStorage.setItem("userName", responseParsed?.loginResp?.userName),
      sessionStorage.setItem("type", parseInt(responseParsed?.loginResp?.type)),
      sessionStorage.setItem("status", parseInt(responseParsed?.loginResp?.status)),
      sessionStorage.setItem("userid", parseInt(responseParsed?.loginResp?.userid))
      sessionStorage.setItem("designation", responseParsed?.loginResp?.designation)
      sessionStorage.setItem("docStatus", parseInt(responseParsed?.loginResp?.docstatus))

      const userRolesResponse = await getUserRoles()

      const getEntityDetails = await getSubEntityMapping()
      sessionStorage.setItem("subEntityCode", getEntityDetails)

      if(userRolesResponse?.status){
        sessionStorage.setItem('userRolesData', JSON.stringify(userRolesResponse?.result))
        return responseParsed
      }
        
    } else {
      return responseParsed
    }

}

export const logout = async () => {
    sessionStorage.clear()
    window.location.replace('/')
}

export const sendOtpRequest = async (username, type) => {
    console.log(username, type);
      let token = sessionStorage.getItem('token')
      let url = `${BaseURL}/UserLogin/otpforchangepassword`
      console.log(url);
    try {
      const response = await fetch(url, {
        method: 'POST',
          headers: {
              'Accept': '*/*',
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
        body: JSON.stringify({
          username: username,
          type: 'user',
        }),
      });
      console.log(response);
  
      const data = await response.json();
      console.log(data);
      return data;
  
    } 
  
    catch (error) {
      console.error('Error sending OTP:', error);
      return false;
    }
  };
  
  export const changePasswordRequest = async (username, type, newPassword, otp) => {
      console.log(username, type, newPassword, otp, "changePasswordRequest");
      let token = sessionStorage.getItem('token')
      
    try {
      const response = await fetch(`${BaseURL}/UserLogin/Changepassword`, {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          type: 'user',
          nepassword: newPassword,
          otp: otp,
        }),
      });
  
      const data = await response.json();
      console.log(data);
      return data;
  
      // if (response.ok) {
      //   return true;
      // } else {
      //   console.error('Failed to change password');
      //   return false;
      // }
    } catch (error) {
      console.error('Error changing password:', error);
      return false;
    }
  };



  // Permit Holder Login
  export const loginPermitHolder = async (username, password) => {

    sessionStorage.clear()

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    };
    const response = await fetch(`${BaseURL}/UserLogin/pholderlogin`, requestOptions)
    const responseParsed = await response.json()
    console.log(responseParsed);
    if (responseParsed?.status) {
        sessionStorage.setItem('token', (responseParsed?.token))
        sessionStorage.setItem('access_token', (responseParsed?.access_token))
        sessionStorage.setItem("userName", responseParsed?.loginResp?.username),
        sessionStorage.setItem("userType", responseParsed?.loginResp?.roletype);
        sessionStorage.setItem("parentUser", responseParsed?.loginResp?.parent_user);
        sessionStorage.setItem("user_type", responseParsed?.loginResp?.user_type)
        return responseParsed
    }

}

