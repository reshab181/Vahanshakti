import { BaseURL } from "../constants/baseURL";
import { checkResponse } from "./checkResponse";
import fetchInterceptor from "./fetchInterceptor";

export const getAllManufacturer = async () => {
  let token = sessionStorage.getItem("token");

  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("x-api-version", "1.0 ");
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetchInterceptor(
    `${BaseURL}/StateBackendUsers/getallmanufacturer`,
    requestOptions
  );
  const responseParsed = await response.json();
  return responseParsed["result"];
};
export const getAllManufacturerById = async (eid) => {
  let token = sessionStorage.getItem("token");

  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetchInterceptor(
    `${BaseURL}/Manufacturer/getusers?eid=${eid}`,
    requestOptions
  );
  const responseParsed = await response.json();
  return responseParsed["result"];
};

export const uploadDocManufacture = async (file) => {
  let token = sessionStorage.getItem("token");
  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);
  var formdata = new FormData();
  formdata.append("file", file);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };
  const response = await fetchInterceptor(
    `${BaseURL}/Manufacturer/uploaddoc`,
    requestOptions
  );
  const responseParsed = await response.json();
  console.log(responseParsed, "responseParsed");
  return responseParsed;
};

export const createManufacture = async (data) => {
  let token = sessionStorage.getItem("token");
  console.log(token);
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("accept", "*/*");

  const requestOptions = {
    method: "POST",
    body: JSON.stringify({
      ...data,
    }),
    headers: myHeaders,
  };
  const response = await fetchInterceptor(
    `${BaseURL}/Manufacturer/createManufacturer`,
    requestOptions
  );
  const responseParsed = await response.json();
  console.log(responseParsed, "responseParsed");
  return responseParsed;
};

export const updateManufacture = async (data) => {
  let token = sessionStorage.getItem("token");
  console.log(token);
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("accept", "*/*");

  const requestOptions = {
    method: "POST",
    body: JSON.stringify({
      ...data,
    }),
    headers: myHeaders,
  };
  const response = await fetchInterceptor(
    `${BaseURL}/Manufacturer/updateManufacturer`,
    requestOptions
  );
  return checkResponse(response);
};

export const checkUserManufacture = async (username) => {
  const url = `${BaseURL}/Manufacturer/checkuser?UserName=${username}`;
  let token = sessionStorage.getItem("token");
  try {
    const response = await fetchInterceptor(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Request failed");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const addUserManufacture = async (data) => {
  let token = sessionStorage.getItem("token");

  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    body: JSON.stringify({
      ...data,
    }),
    headers: myHeaders,
  };
  const response = await fetchInterceptor(
    `${BaseURL}/Manufacturer/createuser`,
    requestOptions
  );
  const responseParsed = await response.json();
  console.log(responseParsed, "responseParsed");
  return responseParsed;
};

export const updateUserManufacture = async (data) => {
  let token = sessionStorage.getItem("token");

  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    body: JSON.stringify({
      ...data,
    }),
    headers: myHeaders,
  };
  const response = await fetchInterceptor(
    `${BaseURL}/Manufacturer/updateuser`,
    requestOptions
  );
  const responseParsed = await response.json();
  console.log(responseParsed, "responseParsed");
  return responseParsed;
};

// Empanelent APIs
export const getAllPendingData = async () => {
  let token = sessionStorage.getItem("token");
  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetchInterceptor(
      `${BaseURL}/Empanelment/getallEmpanelment?status=-1`,
      requestOptions
    );
    const responseParsed = await response.json();
    return responseParsed;
  } catch (err) {
    console.log("error in network", err);
  }
};

export const confirmPendingData = async (data) => {
  let token = sessionStorage.getItem("token");
  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      ...data,
    }),
  };

  try {
    const response = await fetchInterceptor(
      `${BaseURL}/Empanelment/ApproveManufacturer`,
      requestOptions
    );
    const responseParsed = await response.json();
    return responseParsed;
  } catch (err) {
    console.log("error in network", err);
  }
};

// DETAILS

export const getManufactureDetailsById = async (manufacturerId) => {
  let token = sessionStorage.getItem("token");
  // let manufacturerId = sessionStorage.getItem('manufactureId');
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetchInterceptor(
    `${BaseURL}/Manufacturer/getManufacturerbyid?eid=${manufacturerId}`,
    requestOptions
  );
  return checkResponse(response);
};

export const getUsersInMNF = async (manufacturerId) => {
  let token = sessionStorage.getItem("token");
  // let manufacturerId = sessionStorage.getItem('manufactureId');
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const response = await fetchInterceptor(
    `${BaseURL}/Manufacturer/getusers?eid=${manufacturerId}`,
    requestOptions
  );
  const responseParsed = await response.json();
  console.log(responseParsed, "responseParsed");
  return responseParsed;
};

export const getDeviceInventoryList = async (manufacturerId) => {
  let token = sessionStorage.getItem("token");
  // let manufacturerId = sessionStorage.getItem('manufactureId');
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const url = `${BaseURL}/DeviceInventory/getdevicelistbyeid?eid=${manufacturerId}`;
  console.log(url);
  try {
    const response = await fetchInterceptor(url, requestOptions);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseParsed = await response.json();
    console.log(responseParsed, "responseParsed");
    return responseParsed;
  } catch (error) {
    console.error("Error fetching manufacturer details by ID:", error);
    throw error;
  }
};

export const getdeviceApprovalById = async () => {
  let token = sessionStorage.getItem("token");
  // let manufacturerId = sessionStorage.getItem('manufactureId');
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetchInterceptor(
      `${BaseURL}/DeviceApproval/getuserdeviceapproval`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseParsed = await response.json();
    console.log(responseParsed, "responseParsed");
    return responseParsed;
  } catch (error) {
    console.error("Error fetching manufacturer details by ID:", error);
    throw error;
  }
};

export const getDeviceApprovedByeId = async (manufactureId) => {
  console.log(manufactureId);
  let token = sessionStorage.getItem("token");
  // let manufactureId = sessionStorage.getItem('manufactureId');
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("accept", "*/*");
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetchInterceptor(
      `${BaseURL}/DeviceApproval/getdeviceapprovalbyeid?eid=${manufactureId}`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseParsed = await response.json();
    console.log(responseParsed, "responseParsed");
    return responseParsed;
  } catch (error) {
    console.error("Error fetching manufacturer details by ID:", error);
    throw error;
  }
};

export const getDistributorsDetailsById = async (manufactureId) => {
  console.log(manufactureId);
  let token = sessionStorage.getItem("token");
  // let manufactureId = sessionStorage.getItem('manufactureId');
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetchInterceptor(
      `${BaseURL}/Distributor/getallDistributor?eid=${manufactureId}`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseParsed = await response.json();
    console.log(responseParsed, "responseParsed");
    return responseParsed;
  } catch (error) {
    console.error("Error fetching manufacturer details by ID:", error);
    throw error;
  }
};

export const getRFCsDetailsById = async (manufactureId) => {
  console.log(manufactureId);
  let token = sessionStorage.getItem("token");
  // let manufactureId = sessionStorage.getItem('manufactureId');
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetchInterceptor(
      `${BaseURL}/Rfc/getallrfc?eid=${manufactureId}`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseParsed = await response.json();
    console.log(responseParsed, "responseParsed");
    return responseParsed;
  } catch (error) {
    console.error("Error fetching manufacturer details by ID:", error);
    throw error;
  }
};

// Register without Login API

export const registerMNF = async (formData) => {
  console.log(formData);
  try {
    const response = await fetchInterceptor(`${BaseURL}/Empanelment/Create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-client": "6f9478c9134c11ee6f9478c9134c11eeb20700be432ac",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data, "Manufacturer empanelment data");
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getDocumentFullUrl = async (fileName) => {
  let token = sessionStorage.getItem("token");
  // let manufacturerId = sessionStorage.getItem('manufactureId');
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetchInterceptor(
    `${BaseURL}/Empanelment/presignedURL?filename=${fileName}`,
    requestOptions
  );
  console.log(response);
  let data = await checkResponse(response);
  return data?.url;
};

export const getManfUserbyId = async (id) => {
  let token = sessionStorage.getItem("token");

  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetchInterceptor(
    `${BaseURL}/Manufacturer/getuserbyid?id=${id}`,
    requestOptions
  );

  return checkResponse(response);
};

export const mapDistributorsToManufacturers = async (formData) => {
  let token = sessionStorage.getItem("token");

  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
    body: formData,
  };

  console.log(requestOptions, "requestOptions");

  const response = await fetchInterceptor(
    `${BaseURL}/StateBackendUsers/distributorEntityMapping`,
    requestOptions
  );

  return checkResponse(response);
};

export const removeDistributorsFromManufacturers = async (formData) => {
  let token = sessionStorage.getItem("token");

  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
    body: formData,
  };

  console.log(requestOptions, "requestOptions");

  const response = await fetchInterceptor(
    `${BaseURL}/StateBackendUsers/RemovedistributorEntityMapping`,
    requestOptions
  );

  return checkResponse(response);
};

export const mapRFCsToManufacturer = async (formData) => {
  let token = sessionStorage.getItem("token");

  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
    body: formData,
  };

  console.log(requestOptions, "requestOptions");

  const response = await fetchInterceptor(
    `${BaseURL}/StateBackendUsers/rfcEntityMapping`,
    requestOptions
  );

  return checkResponse(response);
};

export const removeRFCFromManufacturer = async (formData) => {
  let token = sessionStorage.getItem("token");

  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
    body: formData,
  };

  console.log(requestOptions, "requestOptions");

  const response = await fetchInterceptor(
    `${BaseURL}/StateBackendUsers/RemovRfcEntityMapping`,
    requestOptions
  );

  return checkResponse(response);
};
