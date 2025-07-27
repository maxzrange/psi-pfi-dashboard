import { useAuth } from "@stores/authStore";
import axios from "axios";
const token = useAuth.getState().token;
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
    Authorization: `Bearer ${token}`
  },
  timeout: 60000,
});


