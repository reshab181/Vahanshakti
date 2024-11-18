import { BaseURL } from '../constants/baseURL'
import { checkResponse } from './checkResponse';
import fetchInterceptor from './fetchInterceptor';

export const getAllRFCs = async () => {
  let token = sessionStorage.getItem("token");

  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetchInterceptor(`${BaseURL}/StateBackendUsers/getallrfc?eid=${-1}`, requestOptions)
  const responseParsed = await response.json()
  return responseParsed["result"];
}

export const getAllRFC = async (id) => {
  let token = sessionStorage.getItem("token");

  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetchInterceptor(`${BaseURL}/Rfc/getallrfc?eid=${id}`, requestOptions)
  const responseParsed = await response.json()
  return responseParsed["result"];
}

export const uploadDocRFC = async (file) => {
  let token = sessionStorage.getItem('token');
  let myHeaders = new Headers();
  myHeaders.append('accept', '*/*');
  myHeaders.append('Authorization', 'Bearer ' + token);
  var formdata = new FormData();
  formdata.append('file', file);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };
  const response = await fetchInterceptor(`${BaseURL}/Distributor/uploaddoc`, requestOptions);
  const responseParsed = await response.json();
  console.log(responseParsed, 'responseParsed');
  return responseParsed;
};

export const createRFC = async (data) => {
  let token = sessionStorage.getItem("token");
  console.log(token);
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("accept", "*/*")

  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      ...data
    }),
    headers: myHeaders
  };
  const response = await fetchInterceptor(`${BaseURL}/Rfc/createRfcEntity`, requestOptions);
  const responseParsed = await response.json()
  console.log(responseParsed, "responseParsed")
  return responseParsed;
}

export const updateRFC = async (data) => {
  let token = sessionStorage.getItem("token");
  console.log(token);
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("accept", "*/*")

  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({ ...data }),
    headers: myHeaders
  };
  const response = await fetchInterceptor(`${BaseURL}/Distributor/updateDistributor`, requestOptions);

  return checkResponse(response)
}

export const addUserRFC = async (data) => {
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
  const response = await fetchInterceptor(`${BaseURL}/Distributor/createuser`, requestOptions);
  const responseParsed = await response.json()
  console.log(responseParsed, "responseParsed")
  return responseParsed;
}



export const getAllRFCMNF = async (manfId) => {
  let token = sessionStorage.getItem("token");
  // let eid = sessionStorage.getItem('entityId');
  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);
  const url = `${BaseURL}/Rfc/getallrfc?eid=${manfId}`;
  console.log(url);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetchInterceptor(url, requestOptions)
  const responseParsed = await response.json()
  return responseParsed["result"];
}

// DETAILS
export const getRFCDetailsById = async (eid) => {
  console.log(eid);
  let token = sessionStorage.getItem("token");
  // let distributorId = sessionStorage.getItem('distributorId') ? sessionStorage.getItem('distributorId'): sessionStorage.getItem("userid");
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  try {
    const response = await fetchInterceptor(`${BaseURL}/Distributor/getDistributorbyid?eid=${eid}`, requestOptions);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseParsed = await response.json();
    console.log(responseParsed, "responseParsed");
    return responseParsed;
  } catch (error) {
    console.error('Error fetching manufacturer details by ID:', error);
    throw error; // Re-throw the error for the calling function to handle
  }
};


export const getUsersInRFC = async () => {
  let token = sessionStorage.getItem("token");
  let rfcId = sessionStorage.getItem('entityId');
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  const response = await fetchInterceptor(`${BaseURL}/Rfc/getusers?eid=${rfcId}`, requestOptions)
  const responseParsed = await response.json()
  console.log(responseParsed, "responseParsed")
  return responseParsed;
}


export const uploadBulkRFCExcelList = async (data) => {
  let token = sessionStorage.getItem("token");
  console.log(data, "uploadBulkRFCList")
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");


  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: myHeaders
  };
  const response = await fetchInterceptor(`${BaseURL}/FitmentCenter/uploadFitmentCenter`, requestOptions);
  const responseParsed = await response.json()
  console.log(responseParsed, "responseParsed")
  return responseParsed;
}


export const getExcelRFCByEID = async (eid) => {
 
  let token = sessionStorage.getItem("token");
 
  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetchInterceptor(`${BaseURL}/FitmentCenter/allFitmentCenter?eid=${eid}&type=RFC`, requestOptions)
  
  return checkResponse(response)
  
}




export const getManufacturerExcelRFCs = async () => {
 
  let token = sessionStorage.getItem("token");
 
  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetchInterceptor(`${BaseURL}/FitmentCenter/allFitmentCenter?type=RFC`, requestOptions)
  
  return checkResponse(response)
  
}


export const getExcelDSTByEID = async (eid) => {
 
  let token = sessionStorage.getItem("token");
 
  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetchInterceptor(`${BaseURL}/FitmentCenter/allFitmentCenter?eid=${eid}&type=DST`, requestOptions)
  
  return checkResponse(response)
  
}

export const getFitmentByID= async (eid) => {
 
  let token = sessionStorage.getItem("token");
 
  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetchInterceptor(`${BaseURL}/FitmentCenter/allFitmentCenter?model=${eid}&type=DST`, requestOptions)
  
  return checkResponse(response)
  
}




export const getManufacturerExcelDSTs = async () => {
 
  let token = sessionStorage.getItem("token");
 
  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetchInterceptor(`${BaseURL}/FitmentCenter/allFitmentCenter?type=DST`, requestOptions)
  
  return checkResponse(response)
  
}


export const getRFCUserbyId = async (id) => {
 
  let token = sessionStorage.getItem("token");
 
  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetchInterceptor(`${BaseURL}/Rfc/getuserbyid?id=${id}`, requestOptions)
  
  return checkResponse(response)
  
}

export const updateUserRFC = async (data) => {
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

export const statusUpdateRFCUser = async (data) => {
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
  const response = await fetchInterceptor(`${BaseURL}/Rfc/updateuserstatus`, requestOptions);
  const responseParsed = await response.json()
  console.log(responseParsed, "responseParsed")
  return responseParsed;
}
