import { BaseURL } from "../constants/baseURL";
import { checkResponse } from "./checkResponse";
import fetchInterceptor from "./fetchInterceptor";

// base url constant
let baseUrl = BaseURL

export const getDashboarData = async () => {

    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            Accept: "application/json, text/plain, */*",
            'Content-Type': "application/json",
        },
    };

    const response = await fetchInterceptor(`${baseUrl}/DeviceInventory/GetDeviceSummary`, requestOptions)

    return checkResponse(response)
}

export const updateTestingDeviceStatus = async (body) => {
    console.log(body, "datapassed")

    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            Accept: "application/json, text/plain, */*",
            'Content-Type': "application/json",
        },
        body: JSON.stringify(body)
    };

    const response = await fetchInterceptor(`${baseUrl}/DeviceApproval/UpdateTestingDeviceStatus`, requestOptions)

    return checkResponse(response)

}

export const getTestingDeviceList = async (mCode) => {

    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            Accept: "application/json, text/plain, */*",
            'Content-Type': "application/json",
        }
    };

    const response = await fetchInterceptor(`${baseUrl}/DeviceApproval/GetTestingDeviceList?model_code=${mCode}`, requestOptions)

    return checkResponse(response)

}