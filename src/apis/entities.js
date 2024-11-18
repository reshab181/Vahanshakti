import {BaseURL} from '../constants/baseURL'
import fetchInterceptor from './fetchInterceptor';

export const addentity = async (data) =>{
    let token = sessionStorage.getItem("token");

    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("x-api-version", "1.0 ");
    myHeaders.append("Content-Type", "application/json");
    

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            ...data
        }),
        headers: myHeaders
    };
    const response = await fetchInterceptor(`${BaseURL}/Entity/addentity`, requestOptions);
    const responseParsed = await response.json()
    console.log(responseParsed, "responseParsed")
    return responseParsed;
}

export const getEntitiesByType = async (entityType) => {
    let token = sessionStorage.getItem("token");

    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("x-api-version", "1.0 ");
    myHeaders.append("Content-Type", "application/json");
    
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
      const response = await fetchInterceptor(`${BaseURL}/Entity/getentitybytype?type=${entityType}`, requestOptions)
      const responseParsed = await response.json()
      return responseParsed["result"];
}
