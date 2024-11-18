import { BaseURL } from "../constants/baseURL";
import { checkResponse } from "./checkResponse";
import fetchInterceptor from "./fetchInterceptor";

export const addResponsibility = async (body) => {
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
    `${BaseURL}/Responsibility/addResponsibility`,
    requestOptions
  );

  return checkResponse(response);
};

export const updateResponsibility = async (body) => {
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
    `${BaseURL}/Responsibility/UpdateResponsibility`,
    requestOptions
  );

  return checkResponse(response);
};

export const getResponsibilityList = async (body) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  };

  const response = await fetchInterceptor(
    `${BaseURL}/Responsibility/GetResponsibilityList?entityid=${body?.entityid}&role_type=${body?.role_type}`,
    requestOptions
  );

  return checkResponse(response);
};

export const getResponsibilityByCode = async (body) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  };

  const response = await fetchInterceptor(
    `${BaseURL}/Responsibility/GetResponsibilityByCode?role_type=${
      body?.role_type || -1
    }&resp_code=${body?.resp_code || -1}`,
    requestOptions
  );

  return checkResponse(response);
};

export const getResponsibilityDetails = async (body) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  };

  const response = await fetchInterceptor(
    `${BaseURL}/Responsibility/GetResponsibilityDetails?role_type=${
      body?.role_type || -1
    }`,
    requestOptions
  );

  return checkResponse(response);
};

export const getStateList = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  };

  const response = await fetchInterceptor(
    `${BaseURL}/Responsibility/getstatelist`,
    requestOptions
  );

  return checkResponse(response);
};

export const getCityList = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  };

  const response = await fetchInterceptor(
    `${BaseURL}/Responsibility/getcitylist`,
    requestOptions
  );

  return checkResponse(response);
};
