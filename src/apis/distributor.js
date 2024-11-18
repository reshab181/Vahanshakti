import { BaseURL } from '../constants/baseURL'
import { checkResponse } from './checkResponse';
import fetchInterceptor from './fetchInterceptor';

export const getAllDistributor = async () => {
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

  const response = await fetchInterceptor(`${BaseURL}/StateBackendUsers/getallDistributor`, requestOptions)
  const responseParsed = await response.json()
  return responseParsed["result"];
}

export const uploadDocDistributor = async (file) => {
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

export const createDistributor = async (data) => {
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
  const response = await fetchInterceptor(`${BaseURL}/Distributor/createDistributor`, requestOptions);
  const responseParsed = await response.json()
  console.log(responseParsed, "responseParsed")
  return responseParsed;
}

export const updateDistributor = async (data) => {
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

export const addUserDistributor = async (data) => {
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

export const updateUserDistributor = async (data) => {
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
  const response = await fetchInterceptor(`${BaseURL}/Distributor/updateuser`, requestOptions);
  const responseParsed = await response.json()
  console.log(responseParsed, "responseParsed")
  return responseParsed;
}

export const checkUserDistributor = async (username) => {
  const url = `${BaseURL}/Distributor/checkuser?UserName=${username}`;
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


// Manufacture Admin Distributor List
export const getAllDistributorMNF = async (eid) => {
  let token = sessionStorage.getItem("token");
  // let eid = sessionStorage.getItem('entityId');
  console.log(eid);
  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);
  const url = `${BaseURL}/Distributor/getallDistributor?eid=${eid}`;
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


export const getDistributorsDetailsById = async (eid) => {
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


export const getUsersInDST = async (distributorId) => {
  let token = sessionStorage.getItem("token");
  // let distributorId = sessionStorage.getItem('distributorId');
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  const response = await fetchInterceptor(`${BaseURL}/Distributor/getusers?eid=${distributorId}`, requestOptions)
  const responseParsed = await response.json()
  console.log(responseParsed, "responseParsed")
  return responseParsed;
}


export const getDeviceInventoryListDST = async () => {
  let token = sessionStorage.getItem("token");
  let distributorId = sessionStorage.getItem('distributorId');
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  try {
    const response = await fetchInterceptor(`${BaseURL}/DeviceInventory/getalldevicelist?eid=${distributorId}&roletype=DST&page=1&pageSize=20`, requestOptions);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseParsed = await response.json();
    console.log(responseParsed, "responseParsed");
    return responseParsed;
  } catch (error) {
    console.error('Error fetching distributor details by ID:', error);
  }
}

export const getDstUserbyId = async (id) => {
 
  let token = sessionStorage.getItem("token");
 
  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetchInterceptor(`${BaseURL}/Distributor/getuserbyid?id=${id}`, requestOptions)
  
  return checkResponse(response)
  
}


export const getManufacturerMappedToDST = async () => {
 
  let token = sessionStorage.getItem("token");
 
  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetchInterceptor(`${BaseURL}/Distributor/getManufacturer`, requestOptions)
  
  return checkResponse(response)
  
}




export const getRFCMappedToMNF = async (mnfID) => {
 
  let token = sessionStorage.getItem("token");
 
  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetchInterceptor(`${BaseURL}/Distributor/getallrfcbymnfid?entity_id=${mnfID}`, requestOptions)
  
  return checkResponse(response)
  
}
