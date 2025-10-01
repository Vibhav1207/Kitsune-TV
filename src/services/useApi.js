import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import config from "../config/config";

// Create axios instance with default configuration
const axiosInstance = axios.create({
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false, // Don't send cookies to avoid CORS issues
});

export const API_BASE_URL =
  import.meta.env.VITE_APP_MODE &&
  import.meta.env.VITE_APP_MODE === "development"
    ? config.localUrl
    : config.serverUrl;

const fetchData = async (url) => {
  console.log("API_BASE_URL:", API_BASE_URL);
  console.log("Full URL:", API_BASE_URL + url);
  
  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not configured. Please check your environment variables.");
  }
  
  try {
    const { data } = await axiosInstance.get(API_BASE_URL + url);
    return data;
  } catch (error) {
    console.error("API fetch error:", error);
    console.error("Error details:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      code: error.code
    });
    
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
  console.log("Full infinite URL:", API_BASE_URL + queryKey + pageParam);
  
  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not configured. Please check your environment variables.");
  }
  
  try {
    const { data } = await axiosInstance.get(API_BASE_URL + queryKey + pageParam);
    return data;
  } catch (error) {
    console.error("API infinite fetch error:", error);
    console.error("Error details:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      code: error.code
    });
    
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
