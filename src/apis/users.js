import { BaseURL } from "../constants/baseURL";
import fetchInterceptor from "./fetchInterceptor";
import { checkResponse } from "./checkResponse";

export const addUserAPI = async (data) => {
  let token = sessionStorage.getItem("token");

  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("x-api-version", "1.0 ");
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    body: JSON.stringify({
      ...data,
    }),
    headers: myHeaders,
  };
  const response = await fetchInterceptor(
    `${BaseURL}/UserRoles/saveuserpermission`,
    requestOptions
  );
  const responseParsed = await response.json();
  console.log(responseParsed, "responseParsed");
  return responseParsed;
};

export const updateUserRole = async (data) => {
  let token = sessionStorage.getItem("token");

  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("x-api-version", "1.0 ");
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    body: JSON.stringify({
      ...data,
    }),
    headers: myHeaders,
  };
  const response = await fetchInterceptor(
    `${BaseURL}/UserRoles/updateuserpermission`,
    requestOptions
  );
  const responseParsed = await response.json();
  console.log(responseParsed, "responseParsed");
  return responseParsed;
};

export const getSubEntityMapping = async () => {
  let token = sessionStorage.getItem("token");
  let eid = sessionStorage.getItem("entityId");
  let userType = sessionStorage.getItem("userType");

  var myHeaders = new Headers();
  myHeaders.append("accept", "text/plain");
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  console.log(userType, "responseParsedEntityMap");
  if (userType === "RTO") {
    const response = await fetchInterceptor(
      `${BaseURL}/RTO/getrtobyid?eid=${eid}`,
      requestOptions
    );
    const responseParsed = await response.json();
    return (
      (responseParsed?.status && responseParsed?.result[0]?.entitycode) || "na"
    );
  } else if (userType === "POLICE") {
    const response = await fetchInterceptor(
      `${BaseURL}/Police/getentitybyid?eid=${eid}`,
      requestOptions
    );
    const responseParsed = await response.json();
    return (
      (responseParsed?.status && responseParsed?.result[0]?.rtoCode) || "na"
    );
  } else {
    return "na";
  }
};

export const getUserRoles = async () => {
  let token = sessionStorage.getItem("token");
  let id = sessionStorage.getItem("userid");
  let userType = sessionStorage.getItem("userType");

  let typeUser =
    userType === "SBU" || userType === "SUA"
      ? "StateBackendUsers"
      : userType === "MNF"
      ? "Manufacturer"
      : userType === "DST"
      ? "Distributor"
      : userType === "RTO"
      ? "RTO"
      : userType === "POLICE"
      ? "Police"
      : userType === "AUTH"
      ? "Authority"
      : userType === "RFC"
      ? "Rfc"
      : null;

  var myHeaders = new Headers();
  myHeaders.append("accept", "text/plain");
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetchInterceptor(
    `${BaseURL}/${typeUser}/getuserrole?userid=${id}`,
    requestOptions
  );
  const responseParsed = await response.json();
  return responseParsed;
};

export const getAllowedUserRoles = async (userType) => {
  let token = sessionStorage.getItem("token");
  let id = sessionStorage.getItem("userid");

  console.log(userType, "passed user type");
  let typeUser =
    userType === "SBU" || userType === "SUA"
      ? "StateBackendUsers"
      : userType === "MNF"
      ? "Manufacturer"
      : userType === "DST"
      ? "Distributor"
      : userType === "RTO"
      ? "RTO"
      : userType === "POLICE"
      ? "Police"
      : userType === "AUTH"
      ? "Authority"
      : userType === "RFC"
      ? "Rfc"
      : null;

  console.log(typeUser, "typeUser selected");
  var myHeaders = new Headers();
  myHeaders.append("accept", "text/plain");
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetchInterceptor(
    `${BaseURL}/${typeUser}/getrole?userid=${id}`,
    requestOptions
  );

  const responseParsed = await response.json();
  console.log(responseParsed, "User Roles");
  return responseParsed;
};

export const getAllowedUserRolesPermit = async () => {
  let token = sessionStorage.getItem("token");
  let id = sessionStorage.getItem("userid");
  var myHeaders = new Headers();
  myHeaders.append("accept", "text/plain");
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetchInterceptor(
    `${BaseURL}/PermitHolder/getdefaultrole?userid=${id}`,
    requestOptions
  );

  const responseParsed = await response.json();
  console.log(responseParsed, "User Roles");
  return responseParsed;
};

export const getAllUsersById = async () => {
  let token = sessionStorage.getItem("token");
  let entityId = sessionStorage.getItem("entityId");
  let myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetchInterceptor(
    `${BaseURL}/StateBackendUsers/getallusersbyentity?eid=${entityId}`,
    requestOptions
  );
  const responseParsed = await response.json();
  return responseParsed["result"];
};

export const getStateBackendUserbyId = async (id) => {
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
    `${BaseURL}/StateBackendUsers/getuserbyid?id=${id}`,
    requestOptions
  );

  return checkResponse(response);
};

export const getRoleType = async () => {
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
    `${BaseURL}/StateBackendUsers/usertype?usertype=SBU`,
    requestOptions
  );

  return checkResponse(response);
};
