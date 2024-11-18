import { BaseURL } from "../constants/baseURL";
import { checkResponse } from "./checkResponse";
import fetchInterceptor from "./fetchInterceptor";

export const getLoginLogs = async (body) => {

    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            Accept: "application/json, text/plain, */*",
            'Content-Type': "application/json",
        },
    };

    const response = await fetchInterceptor(`${BaseURL}/StateBackendUsers/GetLoginLogs?fromDt=${body?.fromDt}&toDt=${body?.toD}`, requestOptions)

    return checkResponse(response)
}

export const getSystemLogs = async (body) => {

    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            Accept: "application/json, text/plain, */*",
            'Content-Type': "application/json",
        },
    };

    const response = await fetchInterceptor(`${BaseURL}/StateBackendUsers/GetSystemLogs?fromDt=${body?.fromDt}&toDt=${body?.toD}`, requestOptions)

    return checkResponse(response)
}


export const getPublicDashboard = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "ef7d16df-fbdf-11ee-83f0-0cc47a2ba414");
    myHeaders.append("Cookie", "HttpOnly");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    const response = await fetch(`${BaseURL}/Citizenpermitviolation/getpubdashboard`, requestOptions)
    const responseParsed = await response.json()
    return responseParsed
}

export const postPermitViolation = async (body) => {
    const myHeaders = new Headers();
    myHeaders.append("accept", "*/*");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "ef7d16df-fbdf-11ee-83f0-0cc47a2ba414");

    const raw = JSON.stringify(body);

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    const response = await fetch(`${BaseURL}/Citizenpermitviolation/AddPermitViolation`, requestOptions)
    const responseParsed = await response.json()
    console.log(responseParsed, "/AddPermitViolation")
    return responseParsed
}