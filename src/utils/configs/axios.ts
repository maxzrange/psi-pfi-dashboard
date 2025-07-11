import axios from "axios";

export const axiosOneInstance = axios.create({
  baseURL: process.env.REACT_APP_ONE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 60000,
});
