import { refresh } from "@services/authService";
import axios from "axios";

export const axiosOneInstance = axios.create({
  baseURL: process.env.REACT_APP_ONE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

let isRefreshing = false;

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response.status === 401) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const res = await refresh();

          const newToken = res.data.access_token;

          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newToken}`;
        } catch (error) {
          Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }

      return axiosInstance(originalRequest);
    }

    return Promise.reject(err);
  }
);
