import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // ✅ uses env variable
  timeout: 60000,
  withCredentials: true,
});

export { axiosInstance };
