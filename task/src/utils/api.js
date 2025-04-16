// src/api/utils-api.js
import axios from "axios";

// Backend base URL for Task Manager
const API_BASE_URL = "http://localhost:5000/api/tasks";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: false, // Set to true if auth with cookies is later added
});

// Request Interceptor (Optional for logging/debug)
axiosInstance.interceptors.request.use(
  (config) => {
    // console.log("Request: ", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor (Basic error handling)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

// === Task API Calls ===

export const getTasks = async () => {
  const response = await axiosInstance.get("/");
  return response.data;
};

export const createTask = async (title) => {
  const response = await axiosInstance.post("/", { title });
  return response.data;
};

export const updateTask = async (id, title) => {
  const response = await axiosInstance.put(`/${id}`, { title });
  return response.data;
};

export const toggleTaskCompleted = async (id) => {
  const response = await axiosInstance.patch(`/${id}`);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axiosInstance.delete(`/${id}`);
  return response.data;
};

export default axiosInstance;
