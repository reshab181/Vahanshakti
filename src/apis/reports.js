import { BaseURL } from "../constants/baseURL";
import fetchInterceptor from "./fetchInterceptor";

export const getDevicesWithAlarmReport = async(date1,date2) => {

    console.log(date1,date2);

    let accessToken = sessionStorage.getItem("token")
    console.log(accessToken);
    const url = `${BaseURL}/StateBackendUsers/getalarm?date1=${date1}&date2=${date2}`
    console.log(url);
    try{
      const response = await fetchInterceptor(url, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'Authorization': 'Bearer ' +  accessToken,
        },
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      return data;

    }catch(err){
      console.log(err)
    }
  }