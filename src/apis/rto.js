import {BaseURL} from '../constants/baseURL'
import { checkResponse } from './checkResponse';
import fetchInterceptor from './fetchInterceptor';


export const createRTO = async (data) =>{
    let token = sessionStorage.getItem("token");
    console.log(token);
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");
    
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            ...data
        }),
        headers: myHeaders
    };
    const response = await fetchInterceptor(`${BaseURL}/RTO/createrto`, requestOptions);
    const responseParsed = await response.json()
    return responseParsed;
}

export const updateRTO = async (data) =>{
  let token = sessionStorage.getItem("token");
  console.log(token);
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");
  
  const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
          ...data
      }),
      headers: myHeaders
  };
  const response = await fetchInterceptor(`${BaseURL}/RTO/updaterto`, requestOptions);
  
  return checkResponse(response);
  
}

export const getRTOList = async () => {
    let token = sessionStorage.getItem("token");

    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("x-api-version", "1.0 ");
    myHeaders.append("Content-Type", "application/json");
    
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
      const response = await fetchInterceptor(`${BaseURL}/StateBackendUsers/getallrto`, requestOptions)
      const responseParsed = await response.json()
      return responseParsed["result"];
}


// grt all rto ID and Name
export const getRTOListIDName = async () => {
  let token = sessionStorage.getItem("token");

  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("x-api-version", "1.0 ");
  myHeaders.append("Content-Type", "application/json");
  
  var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    const response = await fetchInterceptor(`${BaseURL}/StateBackendUsers/getallrtoddl`, requestOptions)
    const responseParsed = await response.json()
    return responseParsed["result"];
}

export const addUserRTO = async (data) =>{
    let token = sessionStorage.getItem("token");

    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");
    

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            ...data
        }),
        headers: myHeaders
    };
    const response = await fetchInterceptor(`${BaseURL}/RTO/createuser`, requestOptions);
    const responseParsed = await response.json()
    console.log(responseParsed, "responseParsed")
    return responseParsed;
}

export const updateUserRTO = async (data) =>{
  let token = sessionStorage.getItem("token");

  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");
  

  const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
          ...data
      }),
      headers: myHeaders
  };
  const response = await fetchInterceptor(`${BaseURL}/RTO/updateuser`, requestOptions);
  const responseParsed = await response.json()
  console.log(responseParsed, "responseParsed")
  return responseParsed;
}

export const checkUserRTO = async (username) => {
    const url = `${BaseURL}/RTO/checkuser?UserName=${username}`;
    let token = sessionStorage.getItem("token");
    try {
      const response = await fetchInterceptor(url, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Request failed');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };


  // DETAILS 
  export const getRTODetailsById = async (rtoId) => {
    console.log('Fetching RTO details for ID:', rtoId);

    let token = sessionStorage.getItem("token");
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetchInterceptor(`${BaseURL}/RTO/getrtobyid?eid=${rtoId}`, requestOptions);
        
        
        if (!response.ok) {
            console.error('Response status:', response.status);
            const errorText = await response.text(); 
            console.error('Error response:', errorText); 
            throw new Error('Network response was not ok');
        }

        const responseParsed = await response.json();
        console.log('Fetched RTO details:', responseParsed);
        
       
        return responseParsed;
    } catch (error) {
        console.error('Error fetching RTO details by ID:', error);
        throw error; 
    }
};


  
  export const getUsersInRTO =async(rtoId) =>{
    let token = sessionStorage.getItem("token");
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    const response = await fetchInterceptor(`${BaseURL}/RTO/getusers?eid=${rtoId}`, requestOptions)
    const responseParsed = await response.json()
    console.log(responseParsed, "responseParsed")
    return responseParsed;
  }
  
  export const getRtoUserbyId = async (id) => {
 
    let token = sessionStorage.getItem("token");
   
    let myHeaders = new Headers();
    myHeaders.append("accept", "*/*");
    myHeaders.append("Authorization", "Bearer " + token);
  
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    const response = await fetchInterceptor(`${BaseURL}/RTO/getuserbyid?id=${id}`, requestOptions)
    
    return checkResponse(response)
    
  }