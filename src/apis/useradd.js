import { BaseURL } from '../constants/baseURL'
import fetchInterceptor from './fetchInterceptor';

export const getAllUser = async () => {
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

  const response = await fetchInterceptor(`${BaseURL}/StateBackendUsers/getallusers`, requestOptions)
  const responseParsed = await response.json()
  return responseParsed["result"];
}

export const addUserSBU = async (data) => {
  console.log(data, "addUserSBU");
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
  const response = await fetchInterceptor(`${BaseURL}/StateBackendUsers/createuser`, requestOptions);
  const responseParsed = await response.json()
  console.log(responseParsed, "responseParsed")
  return responseParsed;
}

export const updateUserSua = async (data) => {
  console.log(data);
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
  const response = await fetchInterceptor(`${BaseURL}/StateBackendUsers/updateuser`, requestOptions);
  const responseParsed = await response.json()
  console.log(responseParsed, "responseParsed")
  return responseParsed;
}

export const addUserAuthority = async (data) => {
  console.log(data);
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
  const response = await fetchInterceptor(`${BaseURL}/Authority/createuser`, requestOptions);
  const responseParsed = await response.json()
  console.log(responseParsed, "responseParsed")
  return responseParsed;
}



export const updateUserAuthority = async (data) => {
  console.log(data);
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
  const response = await fetchInterceptor(`${BaseURL}/Authority/updateuser`, requestOptions);
  const responseParsed = await response.json()
  console.log(responseParsed, "responseParsed")
  return responseParsed;
}



export const addUserRFC = async (data) => {
  console.log(data);
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
  const response = await fetchInterceptor(`${BaseURL}/Rfc/createuser`, requestOptions);
  const responseParsed = await response.json()
  console.log(responseParsed, "responseParsed")
  return responseParsed;
}



export const updateUserRFC = async (data) => {
  console.log(data);
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
  const response = await fetchInterceptor(`${BaseURL}/Rfc/updateuser`, requestOptions);
  const responseParsed = await response.json()
  console.log(responseParsed, "responseParsed")
  return responseParsed;
}







export const getAlluserMNF = async () => {
  let token = sessionStorage.getItem("token");
  let eid = sessionStorage.getItem("entityId")

  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetchInterceptor(`${BaseURL}/Manufacturer/getusers?eid=${eid}`, requestOptions)
  const responseParsed = await response.json()
  return responseParsed["result"];
}

export const getAlluserRTO = async () => {
  let token = sessionStorage.getItem("token");
  let eid = sessionStorage.getItem("entityId")

  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetchInterceptor(`${BaseURL}/RTO/getusers?eid=${eid}`, requestOptions)
  const responseParsed = await response.json()
  return responseParsed["result"];
}

export const getAlluserDST = async () => {
  let token = sessionStorage.getItem("token");
  let eid = sessionStorage.getItem("entityId")

  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetchInterceptor(`${BaseURL}/Distributor/getusers?eid=${eid}`, requestOptions)
  const responseParsed = await response.json()
  console.log(responseParsed, "Distributor List")
  return responseParsed["result"];
}

