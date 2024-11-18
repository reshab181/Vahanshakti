import { BaseURL } from "../constants/baseURL";
import { checkResponse } from "./checkResponse";
import fetchInterceptor from "./fetchInterceptor";

export const uploadDoc = async (file) => {

    let fd = new FormData()
    fd.append('file', file)

    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: fd
    };

    const response = await fetchInterceptor(`${BaseURL}/AccidentApi/uploaddoc`, requestOptions)

    return checkResponse(response)
}

export const addAccidentInfo = async (body) => {

    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            Accept: "application/json, text/plain, */*",
            'Content-Type': "application/json",
        },
        body: JSON.stringify(body)
    };

    const response = await fetchInterceptor(`${BaseURL}/AccidentApi/AddAccidentInfo`, requestOptions)

    return checkResponse(response)
}

export const getAccidentInfo = async (body) => {

    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            Accept: "application/json, text/plain, */*",
            'Content-Type': "application/json",
        },
    };

    const response = await fetchInterceptor(`${BaseURL}/AccidentApi/GetAccidentInfo?entityId=${body?.entityId || -1}&fromDt=${body?.fromDate}&toDt=${body?.toDate}`, requestOptions)

    return checkResponse(response)
}

export const addSosInfo = async (body) => {

    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            Accept: "application/json, text/plain, */*",
            'Content-Type': "application/json",
        },
        body: JSON.stringify(body)
    };

    const response = await fetchInterceptor(`${BaseURL}/AccidentApi/AddSosInfo`, requestOptions)

    return checkResponse(response)
}

export const getSosInfo = async (body) => {

    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            Accept: "application/json, text/plain, */*",
            'Content-Type': "application/json",
        },
    };

    const response = await fetchInterceptor(`${BaseURL}/AccidentApi/GetSosInfo?entityId=${body?.entityId || -1}&fromDt=${body?.fromDate}&toDt=${body?.toDate}`, requestOptions)

    return checkResponse(response)
}

export const getets360data = async (body) => {

    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            Accept: "application/json, text/plain, */*",
            'Content-Type': "application/json",
        },
    };

    const response = await fetchInterceptor(`${BaseURL}/GetEST360/GetEST360Alarm?fromDt=${body?.fromDate}&toDt=${body?.toDate}`, requestOptions)

    return checkResponse(response)
}



export const getReportedViolations = async (body) => {

    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            Accept: "application/json, text/plain, */*",
            'Content-Type': "application/json",
        },
    };

    const response = await fetchInterceptor(`${BaseURL}/AccidentApi/GetPermitViolation?fromDt=${body?.fromDate}&toDt=${body?.toDate}`, requestOptions)

    return checkResponse(response)
}


export const addDodInfo = async (body) => {

    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            Accept: "application/json, text/plain, */*",
            'Content-Type': "application/json",
        },
        body: JSON.stringify(body)
    };

    const response = await fetchInterceptor(`${BaseURL}/AccidentApi/AddDriversOnDuty`, requestOptions)

    return checkResponse(response)
}

export const getDodList = async (body) => {

    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            Accept: "application/json, text/plain, */*",
            'Content-Type': "application/json",
        },
    };

    const response = await fetchInterceptor(`${BaseURL}/AccidentApi/GetDriversOnDutyList?userid=${body?.userId || -1}&fromDt=${body?.fromDate}&toDt=${body?.toDate}`, requestOptions)

    return checkResponse(response)
}

export const getDocumentFullUrl = async (file) => {

    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            Accept: "application/json, text/plain, */*",
            'Content-Type': "application/json",
        },
    };

    const response = await fetchInterceptor(`${BaseURL}/Empanelment/presignedURL?filename=${file}`, requestOptions);

    let data = await checkResponse(response)
    return data?.url;

}