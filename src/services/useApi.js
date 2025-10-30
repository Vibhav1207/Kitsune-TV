import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import config from "../config/config";

// Use our own Vercel API endpoint for production
export const API_BASE_URL = 
  (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1')
    ? "/api" // Use our own Vercel function
    : (import.meta.env.VITE_APP_MODE && import.meta.env.VITE_APP_MODE === "development")
      ? config.localUrl
      : config.serverUrl;

// Create axios instance with default configuration
const axiosInstance = axios.create({
  timeout: 30000, // Increased to 30 seconds for slow proxy responses
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false, // Don't send cookies to avoid CORS issues
});

const fetchData = async (url) => {
  console.log("API_BASE_URL:", API_BASE_URL);
  console.log("Requested URL:", url);
  console.log("Full URL:", API_BASE_URL + url);
  
  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not configured. Please check your environment variables.");
  }
  
  // Remove /v1 from URL since our API function handles the full path
  const cleanUrl = url.startsWith('/v1') ? url.substring(3) : url;
  console.log("Clean URL:", cleanUrl);
  console.log("Final URL:", API_BASE_URL + cleanUrl);

  const primaryUrl = API_BASE_URL + cleanUrl;

  try {
    const { data } = await axiosInstance.get(primaryUrl);
    // Validate shape; upstream responses usually have a "data" key.
    if (typeof data === 'string' || !data || (typeof data === 'object' && !('data' in data))) {
      console.warn('Primary response shape unexpected, attempting fallback', { primaryUrl, dataType: typeof data });
      throw new Error('Unexpected response shape');
    }
    return data;
  } catch (error) {
    console.error("Primary API fetch error:", error?.message || error);
    console.error("Primary error details:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      code: error.code,
      primaryUrl,
    });

    // Fallback logic: try alternate endpoints that exist in the repo
    try {
      // If the endpoint is /anime/{id}, try /anime?id={id}
      if (cleanUrl.startsWith('/anime/')) {
        const id = cleanUrl.split('/').pop();
        const fallbackUrl = `${API_BASE_URL}/anime?id=${encodeURIComponent(id)}`;
        console.log('Fallback URL (anime):', fallbackUrl);
        const { data: fb } = await axiosInstance.get(fallbackUrl);
        if (typeof fb === 'string' || !fb || (typeof fb === 'object' && !('data' in fb))) {
          throw new Error('Fallback anime response not JSON');
        }
        return fb;
      }
      // If the endpoint is /episodes/{id}, try /episodes?id={id}
      if (cleanUrl.startsWith('/episodes/')) {
        const id = cleanUrl.split('/').pop();
        const fallbackUrl = `${API_BASE_URL}/episodes?id=${encodeURIComponent(id)}`;
        console.log('Fallback URL (episodes):', fallbackUrl);
        const { data: fb } = await axiosInstance.get(fallbackUrl);
        if (typeof fb === 'string' || !fb || (typeof fb === 'object' && !('data' in fb))) {
          throw new Error('Fallback episodes response not JSON');
        }
        return fb;
      }
    } catch (fbErr) {
      console.error('Fallback request failed:', fbErr?.message || fbErr);
      // Fall through to final error mapping
    }

    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - Server is taking too long to respond');
    } else if (error.response) {
      throw new Error(`Server Error: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error('Network Error - Unable to reach the server. This might be a CORS issue.');
    } else {
      throw new Error(`Request Error: ${error.message}`);
    }
  }
};

export const useApi = (endpoint) => {
  return useQuery({
    queryKey: [endpoint],
    queryFn: () => fetchData(endpoint),
    retry: 2,
    enabled: !!endpoint,
    refetchOnWindowFocus: false,
  });
};

const fetchInfiniteData = async ({ queryKey, pageParam }) => {
  console.log("Fetching infinite data:", { queryKey, pageParam, API_BASE_URL });
  
  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not configured. Please check your environment variables.");
  }
  
  try {
    const cleanUrl = queryKey[0].startsWith('/v1') ? queryKey[0].substring(3) : queryKey[0];
    const fullUrl = API_BASE_URL + cleanUrl + pageParam;
    console.log("Full infinite URL:", fullUrl);
    
    const { data } = await axiosInstance.get(fullUrl);
    return data;
  } catch (error) {
    console.error("API infinite fetch error:", error);
    
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
};
export const useInfiniteApi = (endpoint) => {
  return useInfiniteQuery({
    queryKey: [endpoint],
    queryFn: fetchInfiniteData,
    initialPageParam: 1,
    retry: 0,
    getNextPageParam: (lastpage) => {
      if (lastpage.data.pageInfo.hasNextPage) {
        return lastpage.data.pageInfo.currentPage + 1;
      } else {
        return undefined;
      }
    },
  });
};
