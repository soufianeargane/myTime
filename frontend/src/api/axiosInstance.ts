import axios from "axios";
axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3000", // "http://localhost:3000",
});

export default axiosInstance;
