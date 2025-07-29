import { refresh } from "@services/authService";
import { useAuth } from "@stores/authStore";
import { generateEncryption } from "@utils/helpers/generator";
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

axiosInstance.interceptors.request.use((config) => {
  const token = useAuth.getState().token;

  const skipAuth = config.skipAuth ?? false;

  if (!skipAuth && token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let isRefreshing = false;

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const username = useAuth.getState().username;
    const setToken = useAuth.getState().setToken;

    const originalRequest = err.config;

    if (err.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const res = await refresh();

          const newToken = res.data.access_token;

          localStorage.setItem("@token", generateEncryption(newToken));

          setToken(newToken, username);

          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
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
