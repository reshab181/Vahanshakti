import { BaseURL } from "../constants/baseURL";
import { checkResponse } from "./checkResponse";
import fetchInterceptor from "./fetchInterceptor";

export const uploadDocESIM = async (file) => {
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
    `${BaseURL}/EsimProvider/uploaddoc`,
    requestOptions
  );
  const responseParsed = await response.json();
  console.log(responseParsed, "responseParsed");
  return responseParsed;
};

export const createESIM = async (data) => {
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
    `${BaseURL}/EsimProvider/createEsimProvider`,
    requestOptions
  );
  const responseParsed = await response.json();
  console.log(responseParsed, "responseParsed ESIM Provider Data");
  return responseParsed;
};

export const updateESIM = async (data) => {
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
    `${BaseURL}/EsimProvider/updateEsimProvider`,
    requestOptions
  );
  return checkResponse(response);
};

export const getEsimAllProvider = async () => {
  let token = sessionStorage.getItem("token");

  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("accept", "*/*");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetchInterceptor(
    `${BaseURL}/EsimProvider/getEsimAllProvider`,
    requestOptions
  );
  const responseParsed = await response.json();
  return responseParsed["result"];
};

// Approving Authority apis

export const createApprovingAuthority = async (data) => {
  let token = sessionStorage.getItem("token");
  console.log(token);
  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
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
    `${BaseURL}/Authority/createautority`,
    requestOptions
  );
  const responseParsed = await response.json();
  console.log(responseParsed, "responseParsed");
  return responseParsed;
};

export const updateApprovingAuthority = async (data) => {
  let token = sessionStorage.getItem("token");
  console.log(token);
  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
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
    `${BaseURL}/Authority/updateAutority`,
    requestOptions
  );

  return checkResponse(response);
};

export const getApprovingAuthority = async () => {
  let token = sessionStorage.getItem("token");

  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("accept", "*/*");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetchInterceptor(
    `${BaseURL}/Authority/getallAutority`,
    requestOptions
  );
  const responseParsed = await response.json();
  console.log(responseParsed, "getAllAuthority");
  return responseParsed["result"];
};

// Device Approval from Device Approval ADD

export const getEsimAllProviderIdCodeName = async () => {
  let token = sessionStorage.getItem("token");

  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("accept", "*/*");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetchInterceptor(
    `${BaseURL}/EsimProvider/getEsimAllProviderIdCodeName`,
    requestOptions
  );
  const responseParsed = await response.json();
  return responseParsed["result"];
};

export const getDeviceApprovalByEID = async (id) => {
  let token = sessionStorage.getItem("token");

  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("accept", "*/*");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  console.log(getDeviceApprovalByEID);
  const response = await fetchInterceptor(
    `${BaseURL}/DeviceApproval/getdeviceapprovalbyeid?eid=${id}`,
    requestOptions
  );
  const responseParsed = await response.json();
  return responseParsed["result"];
};

export const getAuthorityDetailByID = async (authID) => {
  let token = sessionStorage.getItem("token");

  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("accept", "*/*");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetchInterceptor(
    `${BaseURL}/Authority/getAutoritybyid?eid=${authID}`,
    requestOptions
  );
  const responseParsed = await response.json();
  return responseParsed["result"];
};

export const getPendingAuthApproval = async (authorityCode) => {
  let token = sessionStorage.getItem("token");

  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("accept", "*/*");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let url = `${BaseURL}/DeviceApproval/GetallDeviceApprovalAuth?authcode=${authorityCode}&status=0`;
  const response = await fetchInterceptor(url, requestOptions);
  const responseParsed = await response.json();
  console.log("responseParsed", responseParsed, url);
  return responseParsed["result"];
};

export const activateDeviceApproval = async (modelCode, id) => {
  let token = sessionStorage.getItem("token");
  try {
    const response = await fetchInterceptor(
      `${BaseURL}/DeviceApproval/DeviceApprovalAuth`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: id,
          model_code: modelCode,
          status: 1,
          remarks: "Approve",
        }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during device approval:", error);
    throw error;
  }
};

export const getAllDeviceApproval = async (status) => {
  let token = sessionStorage.getItem("token");

  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("accept", "*/*");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetchInterceptor(
    `${BaseURL}/DeviceApproval/getalldeviceapproval?status=${status}`,
    requestOptions
  );
  const responseParsed = await response.json();
  console.log("sdgdgs");
  return responseParsed["result"];
};

// export const uploadDocDeviceApproval = async (file) => {
//     let token = sessionStorage.getItem('token');
//     let myHeaders = new Headers();
//     myHeaders.append('accept', '*/*');
//     myHeaders.append('Authorization', 'Bearer ' + token);

//     var formdata = new FormData();
//     formdata.append('file', file);
//     var requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: formdata,
//       redirect: 'follow',
//     };
//     const response = await fetchInterceptor(`${BaseURL}/DeviceApproval/uploaddoc`, requestOptions);
//     const responseParsed = await response.json();
//     console.log(responseParsed, 'responseParsed');
//     return responseParsed;
// };

export const addDeviceApproval = async (data) => {
  let token = sessionStorage.getItem("token");
  console.log(token);
  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");

  data["device_fee"] = parseInt(data["device_fee"]);
  const requestOptions = {
    method: "POST",
    body: JSON.stringify({
      ...data,
    }),
    headers: myHeaders,
  };

  const response = await fetchInterceptor(
    `${BaseURL}/DeviceApproval/adddeviceapproval`,
    requestOptions
  );
  const responseParsed = await response.json();
  console.log(responseParsed, "responseParsed");
  return responseParsed;
};

// Approved Device Api

export const getAllApprovedDeviceUser = async (item) => {
  console.log(item, "getAllApprovedDeviceUser");
  let token = sessionStorage.getItem("token");

  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("accept", "*/*");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetchInterceptor(
    `${BaseURL}/DeviceApproval/getuserdeviceapproval`,
    requestOptions
  );
  const responseParsed = await response.json();
  return responseParsed["result"];
};

export const getAllDeviceApproved = async () => {
  let token = sessionStorage.getItem("token");

  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("accept", "*/*");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetchInterceptor(
    `${BaseURL}/DeviceApproval/getalldeviceapproval`,
    requestOptions
  );
  const responseParsed = await response.json();
  return responseParsed["result"];
};

// ... (existing code)

export const deviceApprovedBySB = async (data) => {
  try {
    const apiUrl = `${BaseURL}/DeviceApproval/updateadmindeviceapproval`;
    const token = sessionStorage.getItem("token");

    const requestBody = JSON.stringify({
      id: data?.id,
      model_code: data?.modelCode,
      approvalstatusbysb: data?.status || 1,
      remarks: data?.remarks || "",
    });

    const response = await fetchInterceptor(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "*/*",
      },
      body: requestBody,
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Device approved successfully:", responseData);
      return responseData;
    } else {
      console.error("Device approval failed with status:", response.status);
      throw new Error("Device approval failed");
    }
  } catch (error) {
    console.error("Error approving device:", error.message);
    throw new Error("Device approval failed");
  }
};
export const getESIMDetailsById = async (providerCode) => {
  let token = sessionStorage.getItem("token");

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
      `${BaseURL}/EsimProvider/getEsimProviderbyId?id=${providerCode}`,
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
export const getApproveDetailsById = async (eid) => {
  let token = sessionStorage.getItem("token");

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
      `${BaseURL}/Authority/getAutoritybyid?eid=${eid}`,
      requestOptions
    );
    // if (!response.ok) {
    //   throw new Error('Network response was not ok');
    // }
    const responseParsed = await response.json();
    console.log(responseParsed, "responseParsed");
    return responseParsed;
  } catch (error) {
    console.error("Error fetching manufacturer details by ID:", error);
    throw error;
  }
};

export const getApproveUser = async (id) => {
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
      `${BaseURL}/Authority/getusers?eid=${id}`,
      requestOptions
    );
    // if (!response.ok) {
    //   throw new Error('Network response was not ok');
    // }
    const responseParsed = await response.json();
    console.log(responseParsed, "responseParsed");
    return responseParsed;
  } catch (error) {
    console.error("Error fetching manufacturer details by ID:", error);
    throw error;
  }
};

export const getApproveAuthorityDetailsById = async (id) => {
  let token = sessionStorage.getItem("token");

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
      `${BaseURL}/Authority/getAutoritybyid?eid=${id}`,
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

// masters API file (e.g., masters.js)
export const uploadDocDeviceApproval = async (file) => {
  try {
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
      `${BaseURL}/DeviceApproval/uploaddoc`,
      requestOptions
    );
    const responseParsed = await response.json();
    console.log(responseParsed, "responseParsed");
    return responseParsed;
  } catch (error) {
    console.error("An error occurred during document upload:", error);
    return { error };
  }
};

// masters API file (e.g., masters.js)
export const uploadDocTestingDeviceImage = async (file, id, docType) => {
  console.log(file, id, docType);
  let token = sessionStorage.getItem("token");
  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);

  var formdata = new FormData();
  formdata.append("file", file);
  formdata.append("id", parseInt(id));
  formdata.append("docType", docType);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  const response = await fetchInterceptor(
    `${BaseURL}/DeviceApproval/uploadtestingdoc`,
    requestOptions
  );
  return checkResponse(response);
};

// Get  the list of documents for a device from the server
export const GetTestingDeviceByid = async (id) => {
  let token = sessionStorage.getItem("token");
  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  const response = await fetchInterceptor(
    `${BaseURL}/DeviceApproval/GetTestingDeviceByid?id=${id}`,
    requestOptions
  );
  return checkResponse(response);
};

// Auth Device Approval

export const getAuthCodeFromEntityID = async () => {
  let token = sessionStorage.getItem("token");
  let eid = sessionStorage.getItem("entityId");
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
      `${BaseURL}/Authority/getAutoritybyid?eid=${eid}`,
      requestOptions
    );
    // if (!response.ok) {
    //   throw new Error('Network response was not ok');
    // }
    const responseParsed = await response.json();
    console.log(responseParsed, "responseParsed");
    return responseParsed;
  } catch (error) {
    console.error("Error fetching manufacturer details by ID:", error);
    throw error;
  }
};

export const getDetailFromAuthCode = async (authCode, status) => {
  let token = sessionStorage.getItem("token");
  // let eid = sessionStorage.getItem("entityId");
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
      `${BaseURL}/DeviceApproval/GetallDeviceApprovalAuth?authcode=${authCode}&status=${status}`,
      requestOptions
    );
    // if (!response.ok) {
    //   throw new Error('Network response was not ok');
    // }
    const responseParsed = await response.json();
    console.log(responseParsed, "responseParsed");
    return responseParsed;
  } catch (error) {
    console.error("Error fetching manufacturer details by ID:", error);
    throw error;
  }
};

export const getAllStates = async () => {
  let token = sessionStorage.getItem("token");

  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("accept", "*/*");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetchInterceptor(
    `${BaseURL}/Responsibility/getstatelist`,
    requestOptions
  );
  const responseParsed = await response.json();
  return responseParsed["result"];
};

export const getAllCitiesForState = async (statecode) => {
  let token = sessionStorage.getItem("token");

  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("accept", "*/*");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetchInterceptor(
    `${BaseURL}/Responsibility/getcitylist?stateCode=${statecode}`,
    requestOptions
  );
  const responseParsed = await response.json();
  return responseParsed["result"];
};
