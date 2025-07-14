import axios, { AxiosError } from "axios";
import { toast } from "sonner";

// Use relative URL in development to work with Vite proxy
const API_URL = import.meta.env.VITE_API_URL as string;
const API_URL2 = import.meta.env.VITE_API_URL7 as string;
const API_URL3 = import.meta.env.VITE_API_URL3 as string;
// console.log("API URL:", API_URL);

// Define error response type
interface ErrorResponse {
  status: number;
  error: string;
  message: string;
  validationErrors?: Record<string, string[]>;
}

export const api3 = axios.create({
  baseURL: API_URL3,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

api3.interceptors.request.use(
  (config) => {
    const token = "Basic YWRtaW46c2VjcmV0";

    if (token && config.headers) {
      config.headers["Accept"] = "*/*";
      config.headers["User-Agent"] = "Apidog/1.0.0 (https://apidog.com)";
      config.headers["Authorization"] = token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Create axios instance
export const api = axios.create({
  baseURL: API_URL,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api2 = axios.create({
  baseURL: API_URL2,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

api2.interceptors.request.use(
  (config) => {
    const token = "Basic YWRtaW46c2VjcmV0";

    if (token && config.headers) {
      config.headers["Accept"] = "*/*";
      config.headers["User-Agent"] = "Apidog/1.0.0 (https://apidog.com)";
      config.headers["Authorization"] = token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    const cctvToken = localStorage.getItem("cctv_token");

    if (token && config.headers) {
      config.headers["X-Auth"] = token;
    }

    if (
      cctvToken &&
      config.url &&
      config.url.includes("/cctv") &&
      config.headers
    ) {
      config.headers["X-CCTV-Token"] = cctvToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for logging and error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) => {
    // console.error("Response error:", error);

    // Handle different error types
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          if (data.validationErrors) {
            // Handle validation errors
            Object.values(data.validationErrors).forEach((errors) => {
              errors.forEach((error) => toast.error(error));
            });
          } else {
            toast.error(data.message || "Invalid request");
          }
          break;
        case 401:
          toast.error("Please log in to continue");
          // Redirect to login if needed
          break;
        case 403:
          toast.error("You do not have permission to perform this action");
          break;
        case 404:
          toast.error("Resource not found");
          break;
        case 500:
          toast.error("Server error. Please try again later.");
          break;
        default:
          toast.error("An unexpected error occurred");
      }
    } else if (error.request) {
      // Network error
      toast.error("Network error. Please check your connection.");
    } else {
      toast.error("An unexpected error occurred");
    }

    return Promise.reject(error);
  }
);

export default api;
