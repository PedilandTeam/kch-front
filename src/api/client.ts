// This is a part of New Structure
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 15000,
});

// Optional: logging in dev mode
if (process.env.NODE_ENV === "development") {
  api.interceptors.request.use((config) => {
    console.log("API Request:", config.url, config.params);
    return config;
  });
}

api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.error("API Error:", err.response?.data || err.message);
    return Promise.reject(err);
  },
);
