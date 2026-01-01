// src/utils/Api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
});

// attach token automatically
api.interceptors.request.use((config) => {
  const collabToken = localStorage.getItem("collabToken");
  const adminToken = localStorage.getItem("token");

  if (collabToken) {
    config.headers.token = collabToken;
  } else if (adminToken) {
    config.headers.token = adminToken;
  }

  return config;
});

export default api;
