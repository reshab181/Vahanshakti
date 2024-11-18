import { getCurrentDate } from "../components/Common/PowerUpFunctions";
import { BaseURL } from "../constants/baseURL";
import { checkResponse } from "./checkResponse";
import fetchInterceptor from "./fetchInterceptor";

export const getAllDeviceList = async (currentPage, pageSize) => {
  try {
    let token = sessionStorage.getItem("token");
    let url = `${BaseURL}/DeviceInventory/getalldevicelistv2?&page=${currentPage}&pageSize=${pageSize}`;
    console.log(url, "getAllDeviceList");
    const response = await fetchInterceptor(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + token,
      },
    });
    // console.log(response);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data.result);
    return data.result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const createDeviceInventory = async (data) => {
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
    `${BaseURL}/DeviceInventory/createdevice`,
    requestOptions
  );
  const responseParsed = await response.json();
  console.log(responseParsed, "responseParsed");
  return responseParsed;
};

export const uploadBulkInventory = async (data) => {
  try {
    let token = sessionStorage.getItem("token");
    const response = await fetchInterceptor(
      `${BaseURL}/DeviceInventory/uploaddevice`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error("Failed to upload bulk inventory");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getApprovalDeviceByID = async () => {
  let token = sessionStorage.getItem("token");

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
      `${BaseURL}/DeviceApproval/getuserdeviceapproved`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseParsed = await response.json();
    console.log(responseParsed["result"]);
    return responseParsed["result"];
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const searchEMEIDevice = async (imei) => {
  let token = sessionStorage.getItem("token");
  const url = `${BaseURL}/DeviceInventory/searchbyimei?imei=${imei}`;

  try {
    const response = await fetchInterceptor(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "*/*",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPermitHolder = async (mob) => {
  let token = sessionStorage.getItem("token");
  try {
    const response = await fetchInterceptor(
      `${BaseURL}/PermitHolder/checkuser?UserName=${mob}`,
      {
        method: "GET",
        headers: {
          accept: "*/*",
          Authorization: "Bearer " + token,
        },
      }
    );

    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    throw new Error("Failed to fetch OTP");
  }
};

export const getOTP = async (id, imei, email, phonenumber) => {
  let token = sessionStorage.getItem("token");
  try {
    const response = await fetchInterceptor(
      `${BaseURL}/DeviceInventory/sendotp`,
      {
        method: "POST",
        headers: {
          accept: "*/*",
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          imeiNo: imei,
          email: email,
          phone: phonenumber,
        }),
      }
    );

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("Failed to fetch OTP");
  }
};

export const validateOTP = async (datas) => {
  let token = sessionStorage.getItem("token");
  try {
    const response = await fetchInterceptor(
      `${BaseURL}/DeviceInventory/otpvalidatelive`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          accept: "*/*",
        },
        body: JSON.stringify(datas),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error in Network");
  }
};

export const validateVahanOTP = async (datas) => {
  let token = sessionStorage.getItem("token");
  try {
    const response = await fetchInterceptor(
      `${BaseURL}/DeviceInventory/otpvalidatelive`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          accept: "*/*",
        },
        body: JSON.stringify(datas),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error in Network");
  }
};

export const revalidateOTP = async (datas) => {
  let token = sessionStorage.getItem("token");
  try {
    const response = await fetchInterceptor(
      `${BaseURL}/DeviceInventory/otpvalidateReactivate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          accept: "*/*",
        },
        body: JSON.stringify(datas),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error in Network");
  }
};

export const revalidateOTPLive = async (datas) => {
  let token = sessionStorage.getItem("token");
  try {
    const response = await fetchInterceptor(
      `${BaseURL}/DeviceInventory/otpvalidateandReactivateLive`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          accept: "*/*",
        },
        body: JSON.stringify(datas),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error in Network");
  }
};

export const activateDevice = async (data) => {
  let token = sessionStorage.getItem("token");
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
    `${BaseURL}/DeviceInventory/activedevice`,
    requestOptions
  );
  const responseParsed = await response.json();
  console.log(responseParsed, "responseParsed");
  return responseParsed;
};

export const getAllDeviceListByEID = async (eid) => {
  try {
    let token = sessionStorage.getItem("token");
    let url = `${BaseURL}/DeviceInventory/getdevicelistbyeid?eid=${eid}`;
    console.log(url);
    const response = await fetchInterceptor(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + token,
      },
    });
    // console.log(response);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data.result);
    return data.result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getInfo = async (id, imei) => {
  console.log(id, imei, "hello world");
  let token = sessionStorage.getItem("token");
  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");
  const requestOptions = {
    method: "POST",
    body: JSON.stringify({
      id: id,
      imeiNo: imei,
    }),
    headers: myHeaders,
  };
  const response = await fetchInterceptor(
    `${BaseURL}/DeviceInventory/getdeviceinfo`,
    requestOptions
  );
  const responseParsed = await response.json();
  console.log(responseParsed, "responseParsed");
  return responseParsed;
};

export const getInfoReactivate = async (id, imei) => {
  let token = sessionStorage.getItem("token");
  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");
  const requestOptions = {
    method: "POST",
    body: JSON.stringify({
      id: id,
      imeiNo: imei,
    }),
    headers: myHeaders,
  };
  const response = await fetchInterceptor(
    `${BaseURL}/DeviceInventory/getdeviceinfoReactivate`,
    requestOptions
  );
  const responseParsed = await response.json();
  console.log(responseParsed, "responseParsed");
  return responseParsed;
};

export const getInfoLive = async (id, imei) => {
  console.log(id, imei, "deviceDatapassed");
  let token = sessionStorage.getItem("token");
  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");
  const requestOptions = {
    method: "POST",
    body: JSON.stringify({
      id: id,
      imeiNo: imei,
    }),
    headers: myHeaders,
  };
  const response = await fetchInterceptor(
    `${BaseURL}/DeviceInventory/getdeviceinfolive`,
    requestOptions
  );
  const responseParsed = await response.json();
  console.log(responseParsed, "responseParsed");
  return responseParsed;
};

export const getInfoReactivateLive = async (id, imei) => {
  let token = sessionStorage.getItem("token");
  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");
  const requestOptions = {
    method: "POST",
    body: JSON.stringify({
      id: id,
      imeiNo: imei,
    }),
    headers: myHeaders,
  };
  const response = await fetchInterceptor(
    `${BaseURL}/DeviceInventory/getdeviceinfoliveReactivate`,
    requestOptions
  );
  const responseParsed = await response.json();
  console.log(responseParsed, "responseParsed");
  return responseParsed;
};

export const removeDevice = async (id, imei) => {
  console.log(id, imei, "removeDevice");
  let token = sessionStorage.getItem("token");
  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");
  const requestOptions = {
    method: "POST",
    body: JSON.stringify({
      id: id,
      imeiNo: imei,
    }),
    headers: myHeaders,
  };
  const response = await fetchInterceptor(
    `${BaseURL}/DeviceInventory/replacedevice`,
    requestOptions
  );
  const responseParsed = await response.json();
  return responseParsed;
};

export const activeDevice = async (id, imei, entitytype, rtocode) => {
  let token = sessionStorage.getItem("token");

  const headers = {
    accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const requestBody = {
    id: id,
    imeiNo: imei,
    entitytype: entitytype,
    rtocode: rtocode,
  };

  const response = await fetchInterceptor(
    `${BaseURL}/DeviceInventory/activedevice`,
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestBody),
    }
  );

  const responseData = await response.json();
  console.log("API Response:", responseData);
  return responseData;
};

export const deviceDetailLiveByID = async (entityIds) => {
  let token = sessionStorage.getItem("access_token");
  const baseUrl = `${BaseURL}/Intuchproxy/live`;
  const url = `${baseUrl}?id=${entityIds}&ignoreBeacon=false&ignoreLiveData=false&includeInActive=false`;
  const response = await fetchInterceptor(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const deviceDetailLiveByMultipleIDs = async (entityIds) => {
  let token = sessionStorage.getItem("access_token");
  const baseUrl = `${BaseURL}/Intuchproxy/live`;
  const url = `${baseUrl}?id=${entityIds.join(
    ","
  )}&ignoreBeacon=false&ignoreLiveData=false&includeInActive=false`;
  const response = await fetchInterceptor(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const updateDD = async (data) => {
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
    `${BaseURL}/DeviceApproval/updatedd`,
    requestOptions
  );
  const responseParsed = await response.json();
  console.log(responseParsed, "responseParsed");
  return responseParsed;
};

export const updateBG = async (data) => {
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
    `${BaseURL}/Manufacturer/updatebg`,
    requestOptions
  );
  const responseParsed = await response.json();
  console.log(responseParsed, "responseParsed");
  return responseParsed;
};

export const uploadDoc = async (file) => {
  let token = sessionStorage.getItem("token");
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + token);

  console.log(file, "file data uploaded");
  // var formdata = json.stringify(file)
  // formdata.append('file', file);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(file),
    redirect: "follow",
  };
  console.log(requestOptions, "abc");
  const response = await fetchInterceptor(
    `${BaseURL}/DeviceApproval/updateprotocol`,
    requestOptions
  );
  const responseParsed = await response.json();
  console.log(responseParsed, "responseParsed");
  return responseParsed;
};

export const addDeviceTesting = async (data) => {
  let token = sessionStorage.getItem("token");
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");
  const bodyData = JSON.stringify({
    ...data,
    entitytype: "0",
  });
  console.log(bodyData, "addTestingDevice");
  const requestOptions = {
    method: "POST",
    body: bodyData,
    headers: myHeaders,
  };
  const response = await fetchInterceptor(
    `${BaseURL}/DeviceApproval/AddTestingDevice`,
    requestOptions
  );
  const responseParsed = await response.json();
  return responseParsed;
};
export const getAddTestingBylist = async (model_code) => {
  let token = sessionStorage.getItem("token");
  // let entityId = sessionStorage.getItem("entityId");
  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetchInterceptor(
    `${BaseURL}/DeviceApproval/GetTestingDeviceList?model_code=${model_code}`,
    requestOptions
  );
  const responseParsed = await response.json();
  return responseParsed["result"];
};

export const getApprovalDevice = async (code) => {
  let token = sessionStorage.getItem("token");

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
      `${BaseURL}/DeviceApproval/getdeviceapproval?code=${code}`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseParsed = await response.json();
    console.log(responseParsed["result"]);
    return responseParsed["result"];
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// Assign to DST
export const assigntodst = async (body) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  const response = await fetchInterceptor(
    `${BaseURL}/DeviceInventory/assigntodst`,
    requestOptions
  );

  return checkResponse(response);
};

// Assign to RFC
export const assigntorfc = async (body) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  const response = await fetchInterceptor(
    `${BaseURL}/DeviceInventory/assigntorfc`,
    requestOptions
  );

  return checkResponse(response);
};

export const assigntorfcuser = async (body) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  const response = await fetchInterceptor(
    `${BaseURL}/DeviceInventory/AssigntoRfcUser`,
    requestOptions
  );

  return checkResponse(response);
};

export const assigntodstuser = async (body) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  const response = await fetchInterceptor(
    `${BaseURL}/DeviceInventory/AssigntoDstUser`,
    requestOptions
  );

  return checkResponse(response);
};

export const imeiToList = async (body) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  const response = await fetchInterceptor(
    `${BaseURL}/DeviceInventory/DeviceInventoryList`,
    requestOptions
  );

  return checkResponse(response);
};

// Approved by CT
export const approvebyct = async (body) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  const response = await fetchInterceptor(
    `${BaseURL}/DeviceInventory/approvebyct`,
    requestOptions
  );

  return checkResponse(response);
};

// Inventory Reports
export const getInventoryReports = async (currentPage, pageSize) => {
  try {
    let token = sessionStorage.getItem("token");
    let url = `${BaseURL}/DeviceInventory/getalldevicelistv2?&page=${currentPage}&pageSize=${pageSize}`;
    const response = await fetchInterceptor(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data, "All inventory Data");
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getSubEntityVehicleMappings = async () => {
  try {
    let token = sessionStorage.getItem("token");
    let userType = sessionStorage.getItem("userType");
    let eid =
      userType === "SBU" || userType === "SUA"
        ? -1
        : sessionStorage.getItem("entityId");

    let currentDate = getCurrentDate();

    let url = `${BaseURL}/DeviceInventory/getalldevicelistv2?eid=${eid}&roletype=${userType}&page=1&pageSize=1000000&fromDt=2024-01-01&toDt=${currentDate}&status=1&locate=1&cttatus=1`;
    console.log(url, "AllSubEntityInventoryData");

    const response = await fetchInterceptor(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + token,
      },
    });

    const data = await response.json();
    if (data?.status) {
      const vehiclesListAvailable =
        (data?.result?.devicelist?.length > 0 &&
          data?.result?.devicelist.map((item) =>
            String(item?.intuchEntityId)
          )) ||
        [];
      return vehiclesListAvailable;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getSubEntityActiveVehicleMappings = async () => {
  try {
    let token = sessionStorage.getItem("token");
    let userType = sessionStorage.getItem("userType");
    let eid = sessionStorage.getItem("entityId");

    let currentDate = getCurrentDate();

    let url = `${BaseURL}/DeviceInventory/getalldevicelistv2?eid=${eid}&roletype=${userType}&page=1&pageSize=1000000&fromDt=2024-01-01&toDt=${currentDate}&status=1&locate=1&cttatus=1`;
    console.log(url, "AllSubEntityInventoryData");

    const response = await fetchInterceptor(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + token,
      },
    });

    const data = await response.json();
    if (data?.status) {
      const vehiclesListAvailable =
        (data?.result?.devicelist?.length > 0 &&
          data?.result?.devicelist.map((item) =>
            String(item?.intuchEntityId)
          )) ||
        [];
      return vehiclesListAvailable;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const deviceApprovalRTO = async (data) => {
  let token = sessionStorage.getItem("token");
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");

  const bodyData = JSON.stringify(data);

  const requestOptions = {
    method: "POST",
    body: bodyData,
    headers: myHeaders,
  };
  const response = await fetchInterceptor(
    `${BaseURL}/DeviceInventory/approvebyrto`,
    requestOptions
  );
  const responseParsed = await response.json();
  return responseParsed;
};

export const updatePermitHolder = async (data) => {
  let token = sessionStorage.getItem("token");
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");

  const bodyData = JSON.stringify(data);

  const requestOptions = {
    method: "POST",
    body: bodyData,
    headers: myHeaders,
  };
  const response = await fetchInterceptor(
    `${BaseURL}/Rfc/OwnerDetailsUpd`,
    requestOptions
  );
  const responseParsed = await response.json();
  return responseParsed;
};
