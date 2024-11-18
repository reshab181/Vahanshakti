import { BaseURL } from '../constants/baseURL'
import fetchInterceptor from './fetchInterceptor';

export const addUserPermit = async (data) =>{
    let token = sessionStorage.getItem("token");

    let myHeaders = new Headers();
    myHeaders.append("accept", "*/*");
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");
    

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            ...data
        }),
        headers: myHeaders
    };
    const response = await fetchInterceptor(`${BaseURL}/PermitHolder/createuser_v1`, requestOptions);
    const responseParsed = await response.json()
    console.log(responseParsed, "responseParsedcreateuser_v1")
    return responseParsed;
}

export const getDevicesPermitHolder = async() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);    

    const today = new Date();
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const formattedYesterday = formatDate(yesterday);
      const formattedToday = formatDate(today);
      console.log(formattedYesterday, formattedToday);

    let accessToken = sessionStorage.getItem("token")
    const url = `${BaseURL}/PermitHolder/getalldevicelist?fromDt=${formattedYesterday}&toDt=${formattedToday}`
    console.log(url);
    try{
      const response = await fetchInterceptor(url, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'Authorization': 'Bearer ' +  accessToken,
        },
      });
      const data = await response.json();
      console.log(data?.result, "permitHolderResponses")
      return data.result;

    }catch(err){
      console.log(err)
    }
  }

  export const fetchLiveData = async() => {
    let accessToken = sessionStorage.getItem("token")
    const url = `${BaseURL}/PermitHolder/devices/live`
    console.log(url);
    try{
      const response = await fetchInterceptor(url, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'Authorization': 'Bearer ' +  accessToken,
        },
      });
      const data = await response.json();
      console.log(data, "livedata");
      return data.data;

    }catch(err){
      console.log(err)
    }
  }


  export const getPermitHolderDefaultRoles = async() => {
    
    let accessToken = sessionStorage.getItem("token")
    let loggedInUserID = sessionStorage.getItem("userid")

    const url = `${BaseURL}/PermitHolder/getdefaultrole?userid=${loggedInUserID}`
    try{
      const response = await fetchInterceptor(url, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'Authorization': 'Bearer ' +  accessToken,
        },
      });
      const data = await response.json();
      return data.result;

    }catch(err){
      console.log(err)
    }
  }
