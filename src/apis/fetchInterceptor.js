import { BaseURL } from "../constants/baseURL";

const handle401Error = async () => {
  try {
    const response = await fetch(`${BaseURL}/UserLogin/refreshtoken`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: sessionStorage.getItem("userName"),
        token: sessionStorage.getItem("token"),
      }),
    });

    const responseParsed = await response.json();

    if (responseParsed?.status === 200) {
      sessionStorage.setItem("token", responseParsed?.token);
      sessionStorage.setItem("access_token", responseParsed?.access_token);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking token:", error);
    return false;
  }
};

const fetchInterceptor = async (url, options) => {
  return fetch(url, options).then(async (response) => {
    // return response;
    if (response.status == 401) {
      // Handle 401 error
      const isTokenValid = await handle401Error();

      // If the token is valid, retry the original request
      if (isTokenValid) {
        return fetch(url, options);
      } else {
        sessionStorage.clear();
        // sessionStorage.setItem("unauthenticated url: ", url); // for testing only
        // sessionStorage.setItem(
        //   "unauthenticated body: ",
        //   JSON.stringify(options)
        // ); // for testing only
        window.location.href = "/";
      }
    }

    return response;
  });
};

export default fetchInterceptor;
