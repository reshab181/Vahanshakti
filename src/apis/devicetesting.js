import { BaseURL } from "../constants/baseURL";

export const startRawPacketCollection = async (imei) => {
  console.log(imei.toString(), "IMEIPassed");
  let token = sessionStorage.getItem("token");

  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  var formdata = new FormData();
  formdata.append("imei", imei.toString());
  formdata.append("active", "true");

  var requestOptions = {
    method: "POST",
    body: formdata,
    headers: myHeaders,
    redirect: "follow",
  };
  console.log(requestOptions, "dataPassedFeatureEnable");
  const response = await fetch(
    `${BaseURL}/Intuchproxy/feaureEnable`,
    requestOptions
  );
  // console.log(response, "Intuchproxy/feaureEnable")
  // const responseParsed = await response.json()
  return response;
};

export const getRawPackets = async (imei) => {
  let token = sessionStorage.getItem("token");

  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  let dateTime = new Date();
  let epochTime = dateTime.getTime();
  let epochTimeInSeconds = Math.floor(epochTime / 1000);
  console.log(epochTimeInSeconds, "epochTimeInSeconds");
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(
    `${BaseURL}/Intuchproxy/getTestingAlarm?imei=${imei}&startTime=${
      epochTimeInSeconds - 60 * 60
    }&endTime=${epochTimeInSeconds}`,
    requestOptions
  );
  const responseParsed = await response.json();
  return responseParsed;
};
