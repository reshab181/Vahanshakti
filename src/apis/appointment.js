import { BaseURL } from "../constants/baseURL";
import fetchInterceptor from "./fetchInterceptor";

export const addAppointmentData = async (body) => {

    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            Accept: "application/json, text/plain, */*",
            'Content-Type': "application/json",
        },
        body: JSON.stringify(body)
    };

    const response = await fetchInterceptor(`${BaseURL}/Appointments/addAppointment`, requestOptions)
    const response_data = await response.json()
    return response_data
}


export const getAppointments = async (modelId) => {

    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            Accept: "application/json, text/plain, */*",
            'Content-Type': "application/json",
        },
    };

    const response = await fetchInterceptor(`${BaseURL}/Appointments/GetAppointment?model=${modelId}`, requestOptions)
    const response_data = await response.json()
    return response_data
}


export const updateAppointmentData = async (body) => {

    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            Accept: "application/json, text/plain, */*",
            'Content-Type': "application/json",
        },
        body: JSON.stringify(body)
    };

    const response = await fetchInterceptor(`${BaseURL}/Appointments/updateAppointment`, requestOptions)
    const response_data = await response.json()
    return response_data
}
