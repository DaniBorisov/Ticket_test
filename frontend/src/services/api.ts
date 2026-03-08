import axios from "axios";

const api = axios.create({
  baseURL: "https://redesigned-disco-5v555xv994q24xrv-5000.app.github.dev/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;