import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import config from '../config/config'

const API_BASE_URL = (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1')
  ? "https://api.allorigins.win/raw?url=https://eren-world.onrender.com/api/v1"
  : config.serverUrl2;
const fetchData2 = async (url) => {
  console.log("API_BASE_URL (useApi2):", API_BASE_URL);
  console.log("Full URL (useApi2):", API_BASE_URL + url);
  
  try {
    const { data } = await axios.get(API_BASE_URL + url, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return data;
  } catch (error) {
    console.error("API fetch error (useApi2):", error);
    console.error("Error details:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - Server is taking too long to respond');
    } else if (error.response) {
      throw new Error(`Server Error: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error('Network Error - Unable to reach the server');
    } else {
      throw new Error(`Request Error: ${error.message}`);
    }
  }
}

export const useApi2 = (endpoint) => {
  return useQuery({
    queryKey: [endpoint],
    queryFn: () => fetchData2(endpoint),
    retry: 2,
    enabled: !!endpoint,
    refetchOnWindowFocus: false,
  })
}
