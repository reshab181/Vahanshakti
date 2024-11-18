import axios from "axios";

const apiUrl = "https://outpost.mapmyindia.com/api/security/oauth/token";

const getAccessToken = async () => {
  const formData = new FormData();
  formData.append("grant_type", "client_credentials");
  formData.append(
    "client_id",
    "33OkryzDZsI6zffdbNB9YyDNAmelVSXDKSkJLtIewBqnSWSL7G00JjLOmkbk2_lnLq--lTIRujdaUcHN-bQjzYsArtDL_pYj"
  );
  formData.append(
    "client_secret",
    "lrFxI-iSEg8SoKZacRf0sf3O3g4CcSDYVBjx1ULzenLsFzpntO9B20Ku62oHo63-kuEtTuxFFbXDsjNHE8A2aggVmHcXmqP4yTjcYHwro7Q="
  );

  const response = await axios.post(apiUrl, formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const { access_token } = response.data;
  sessionStorage.setItem("ACCESS_TOKEN_KEY", access_token);
  return response.data;
};

export default getAccessToken;

// export const getLocation = async () => {
//   let token = sessionStorage.getItem("ACCESS_TOKEN_KEY");
//   if (token) {
//     try {
//       console.log("111111111");
//       var url = "https://intouch.mapmyindia.com/iot/api/devices/";
//       console.log(`url ${url}`);
//       const options = {
//         mode: "cors",
//         cache: "default",
//         credentials: true,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       console.log("222222222");

//       return await fetch(`${url}`, options).then((res) => {
//         console.log("333333333");
//         return res;
//       });

//     } catch (err) {}
//   } else {
//     throw new Error("No Token Found");
//   }
// };

// export const fetchDataToken = async (token) => {
//   const API_URL = 'https://intouch.mapmyindia.com/iot/api/devices/';
//   const access_token = sessionStorage.getItem("ACCESS_TOKEN_KEY")
//   console.log("token from fetch locayion data",access_token);
//   try {
//     const response = await axios.get(API_URL, {
//       headers: {
//         Authorization: `Bearer ${access_token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const fetchDataToken = async () => {
  const API_URL = "https://intouch.mapmyindia.com/iot/api/devices/";
  const access_token = sessionStorage.getItem("ACCESS_TOKEN_KEY");

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const locationData = response.data.data;
  console.log(locationData);
  const locations = locationData
    .filter((item) => item.location !== undefined)
    .map((item) => item.location);
  const latitudes = locationData
    .filter((item) => item.location && item.location.latitude !== undefined)
    .map((item) => item.location.latitude);

  const longitudes = locationData
    .filter((item) => item.location && item.location.longitude !== undefined)
    .map((item) => item.location.longitude);
  return { latitudes, longitudes, locations };
};
