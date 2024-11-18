import { BaseURL } from "../constants/baseURL";
import fetchInterceptor from "./fetchInterceptor";

export const getDevicesWithAlarm = async () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate());

  const today = new Date();
  const formatDate = (date) => {
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    return `${day}${month}${year}`;
  };

  const formattedYesterday = formatDate(yesterday);
  const formattedToday = formatDate(today);
  console.log(formattedYesterday, formattedToday);

  let accessToken = sessionStorage.getItem("token");
  const url = `${BaseURL}/StateBackendUsers/getalarm?date1=${formattedYesterday}&date2=${formattedToday}`;
  try {
    const response = await fetchInterceptor(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + accessToken,
      },
    });
    const data = await response.json();
    console.log(data, "VehiclesFetchedWithAlarms");
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getDeviceAlarmWithList = async (deviceList) => {
  if (deviceList.length > 0) {
    const token = sessionStorage.getItem("token");
    const url = `${BaseURL}/DeviceInventory/GetDeviceAlarm`;
    const headers = {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const body = JSON.stringify({
      devicelist: deviceList.map(Number),
    });

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: body,
      });

      const data = await response.json();
      console.log(data, deviceList, body, "getSpecificAlarm");
      const vehicleMap = {};
      if (data["status"]) {
        for (let i = 0; i < data["result"].length; i++) {
          vehicleMap[data["result"][i]["intuchEntityId"]] = data["result"][i];
        }
        return vehicleMap;
      } else {
        return {};
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
};

export const getAlarmDetailsByIntouchID = async (id) => {
  console.log(id, "getAlarmDetailsByIntouchID");
  let accessToken = sessionStorage.getItem("access_token");

  let dateTime = new Date();
  let epochTime = dateTime.getTime();
  let endTimeInSeconds = Math.floor(epochTime / 1000);
  let startTimeInSeconds = endTimeInSeconds - 24 * 60 * 60 * 3;

  try {
    if (!accessToken) {
      throw new Error("Access token is missing");
    }
    let url = `${BaseURL}/Intuchproxy/alarmLog?entityId=${id}&startTime=${startTimeInSeconds}&endTime=${endTimeInSeconds}`;
    console.log(url);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "*/*",
      },
    });

    console.log(response);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching alarms:", error);
    throw error;
  }
};

export const getAlarmDetailsByIntouchIDDashboard = async (id) => {
  console.log(id, "getAlarmDetailsByIntouchID");
  let accessToken = sessionStorage.getItem("access_token");

  let dateTime = new Date();
  let epochTime = dateTime.getTime();
  let endTimeInSeconds = Math.floor(epochTime / 1000);
  let startTimeInSeconds = endTimeInSeconds - 24 * 60 * 60;

  try {
    if (!accessToken) {
      throw new Error("Access token is missing");
    }
    let url = `${BaseURL}/Intuchproxy/alarmLog?entityId=${id}&startTime=${startTimeInSeconds}&endTime=${endTimeInSeconds}`;
    console.log(url);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "*/*",
      },
    });

    console.log(response);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching alarms:", error);
    throw error;
  }
};

export const getAllAlarm = async (entityIds, time) => {
  let accessToken = sessionStorage.getItem("access_token");
  try {
    if (!accessToken) {
      throw new Error("Access token is missing");
    }
    let url;
    if (time) {
      url = `${BaseURL}/Intuchproxy/alarmLog?entityId=${entityIds.join(
        ","
      )}&startTime=${time?.start}&endTime=${time?.end}`;
    } else {
      url = `${BaseURL}/Intuchproxy/alarmLog?entityId=${entityIds.join(",")}`;
    }

    console.log("url join ids", url);
    const response = await fetchInterceptor(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "*/*",
      },
    });

    const data = await response.json();
    console.log(data, "alarm log fetched");
    return data;
  } catch (error) {
    console.error("Error fetching alarms:", error);
    throw error;
  }
};

export const getSpecificAlarm = async (entityIds, time, alarmType) => {
  let accessToken = sessionStorage.getItem("access_token");
  try {
    if (!accessToken) {
      throw new Error("Access token is missing");
    }
    let url;

    if (time) {
      url = `${BaseURL}/Intuchproxy/alarmLog?entityId=${entityIds.join(
        ","
      )}&startTime=${time?.start}&endTime=${time?.end}&alarmType=${alarmType}`;
    } else {
      url = `${BaseURL}/Intuchproxy/alarmLog?entityId=${entityIds.join(",")}`;
    }
    console.log("urljoinids", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "*/*",
      },
    });

    console.log(response, "alarmlogfetched");
    const data = await response.json();
    console.log(data, "alarmlogfetched");
    return data["data"];
  } catch (error) {
    console.error("Error fetching alarms:", error);
    throw error;
  }
};

export const getAllDeviceData = async () => {
  let accessToken = sessionStorage.getItem("access_token");

  try {
    const response = await fetchInterceptor(`${BaseURL}/Intuchproxy/live`, {
      method: "GET",
      headers: {
        accept: "*/*",
        Authorization: "Bearer " + accessToken,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const data = await response.json();
    // // console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getAlarmData = async (date1, date2, alarmType, alertData) => {
  const token = sessionStorage.getItem(token);
  const queryParams = new URLSearchParams({
    date1: date1,
    date2: date2,
    alarmType: alarmType,
    alertData: alertData,
  });

  const headers = {
    accept: "*/*",
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await fetchInterceptor(
      `${BaseURL}/StateBackendUsers/getalarm?${queryParams}`,
      {
        method: "GET",
        headers: headers,
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("There was a problem with the API request:", error);
    return null;
  }
};

// MNF Emplanmnet APIs

export const uploadDocumentMNFRegister = async (eid, file, docType) => {
  const token = sessionStorage.getItem("token");
  const url = `${BaseURL}/Empanelment/uploaddoc`;
  try {
    const formData = new FormData();
    formData.append("Id", eid);
    formData.append("docType", docType);
    formData.append("file", file);

    const response = await fetchInterceptor(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const responseData = await response.json();
    // console.log(responseData);
    return responseData;
  } catch (error) {
    // console.log(error)
  }
};

// api.js

// api.js

export const updateStatus = async (id, docType, status) => {
  let token = sessionStorage.getItem("token");
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      docType,
      status,
    }),
  };

  try {
    const response = await fetch(
      `${BaseURL}/StateBackendUsers/updatestatus`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchPresignedURL = async (docname) => {
  const url = `${BaseURL}/Empanelment/presignedURL?filename=${docname}`;
  const token = sessionStorage.getItem("token");
  const headers = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching presigned URL:", error);
    return { status: false, url: null };
  }
};
