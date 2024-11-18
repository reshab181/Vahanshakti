import { fetchDataToken } from '../../apis/outpostapi';
import { setMapData } from '../slice/mapDataSlice';

export const fetchMapData = () => async (dispatch) => {
  try {
    const { latitudes, longitudes, locations } = await fetchDataToken();
    dispatch(setMapData({ latitudes, longitudes, locations }));
  } catch (error) {
    console.error('Error fetching location data:', error);
  }
};

export const refreshMapData = () => (dispatch) => {
  const refreshInterval = setInterval(() => {
    dispatch(fetchMapData());
  }, 30000); // Refresh every 30 seconds

  // Return a cleanup function to clear the interval when the component unmounts
  return () => clearInterval(refreshInterval);
};
