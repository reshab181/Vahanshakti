import { PincodeFetchURL } from './baseURL';

export const fetchPincodeData = async (pincode) => {
    if (pincode.length === 6) {
      try {
        const response = await fetch(`${PincodeFetchURL}${pincode}`);
        const data = await response.json();
        if (data[0]?.Status === 'Success') {
          const district = data[0].PostOffice[0].District;
          const state = data[0].PostOffice[0].State;
          const country = data[0].PostOffice[0].Country;
          return { district, state, country };
        } else {
          return null
        }
      } catch (error) {
        return null
      } 
    }
  };