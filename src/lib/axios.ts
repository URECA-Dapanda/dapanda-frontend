import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://api.dapanda.org/", // 실제 백엔드 서버 주소
  baseURL: "http://localhost:8080/",
  withCredentials: true,
});

export default axiosInstance;
