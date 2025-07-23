import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_SSL, // 실제 백엔드 서버 주소
  baseURL: "http://localhost:8080/",
  withCredentials: true,
});

export default axiosInstance;
