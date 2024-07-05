import axios from "axios";
const BASE_TIMEOUT = 6000;

export let request = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: BASE_TIMEOUT,
});

export let requestAuth = axios.create({
  timeout: BASE_TIMEOUT,
  baseURL: process.env.REACT_APP_API_URL,
});

requestAuth.interceptors.request.use(
  (config) => {
    const token = JSON.parse(window.localStorage.getItem("accessToken"));
    const auth = token ? `Bearer ${token}` : "";
    config.headers.common["Authorization"] = auth;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
requestAuth.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);
