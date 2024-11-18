import {BaseURL} from '../constants/baseURL'
import { checkResponse } from './checkResponse';
import fetchInterceptor from './fetchInterceptor';

export const createPoliceEntity = async (data) =>{
    let token = sessionStorage.getItem("token");
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");
    
    console.log(data, "police data")
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            ...data
        }),
        headers: myHeaders
    };
    const response = await fetchInterceptor(`${BaseURL}/Police/createrentity`, requestOptions);
    const responseParsed = await response.json()
    return responseParsed;
}

export const updatePoliceEntity = async (data) =>{
  let token = sessionStorage.getItem("token");
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");
  
  console.log(data, "police data")
  const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
          ...data
      }),
      headers: myHeaders
  };
  const response = await fetchInterceptor(`${BaseURL}/Police/updateentity`, requestOptions);
  return checkResponse(response)
}

export const addUserPolice = async (data) =>{
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
    const response = await fetchInterceptor(`${BaseURL}/Police/createuser`, requestOptions);
    const responseParsed = await response.json()
    console.log(responseParsed, "responseParsed")
    return responseParsed;
}

export const updateUserPolice = async (data) =>{
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
  const response = await fetchInterceptor(`${BaseURL}/Police/updateuser`, requestOptions);
  const responseParsed = await response.json()
  console.log(responseParsed, "responseParsed")
  return responseParsed;
}

export const checkUserPolice = async (username) => {
    const url = `${BaseURL}/Police/checkuser?UserName=${username}`;
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
  export const getAllRTOList = async () => {
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
      
      const response = await fetchInterceptor(`${BaseURL}/Police/getallrto`, requestOptions)
      const responseParsed = await response.json()
      return responseParsed["result"];
}

  export const getUsersInPolice =async() =>{
    let token = sessionStorage.getItem("token");
    let Id = sessionStorage.getItem('entityId');
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  const response = await fetchInterceptor(`${BaseURL}/Police/getusers?eid=${Id}`, requestOptions)
  const responseParsed = await response.json()
  console.log(responseParsed, "responseParsed")
  return responseParsed;
  }


  export const getUsersInAUTH =async() =>{
    let token = sessionStorage.getItem("token");
    let Id = sessionStorage.getItem('entityId');
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  const response = await fetchInterceptor(`${BaseURL}/Authority/getusers?eid=${Id}`, requestOptions)
  const responseParsed = await response.json()
  console.log(responseParsed, "responseParsedAUTH")
  return responseParsed;
  }



  export const getEntityIdInPolice =async() =>{
    let token = sessionStorage.getItem("token");
    let Id = sessionStorage.getItem('entityId');
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  const response = await fetchInterceptor(`${BaseURL}/Police/getentitybyid?eid=${Id}`, requestOptions)
  const responseParsed = await response.json()
  console.log(responseParsed, "responseParsed")
  return responseParsed;
  }
  export const getPoliceList = async () => {
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
      
      const response = await fetchInterceptor(`${BaseURL}/StateBackendUsers/getallPolice`, requestOptions)
      const responseParsed = await response.json()
      return responseParsed["result"];
}



// Details
export const getPoliceDetailsById = async (Id) => {
  console.log(Id);
  let token = sessionStorage.getItem("token");
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("accept", "*/*");
  var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
  };
  try {
      const response = await fetchInterceptor(`${BaseURL}/Police/getentitybyid?eid=${Id}`, requestOptions);
      // if (!response.ok) {
      //     throw new Error('Network response was not ok');
      // }
      const responseParsed = await response.json();
      console.log(responseParsed, "responseParsed");
      return responseParsed;
  } catch (error) {
      console.error('Error fetching RTO details by ID:', error);
      throw error;
  }
};

export const getUsersInPoliceeid = async(Id) =>{
  let token = sessionStorage.getItem("token");
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  const response = await fetchInterceptor(`${BaseURL}/Police/getusers?eid=${Id}`, requestOptions)
  const responseParsed = await response.json()
  console.log(responseParsed, "responseParsed")
  return responseParsed;
}

export const getPoliceUserbyId = async (id) => {
 
  let token = sessionStorage.getItem("token");
 
  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetchInterceptor(`${BaseURL}/Police/getuserbyid?id=${id}`, requestOptions)
  
  return checkResponse(response)
  
}