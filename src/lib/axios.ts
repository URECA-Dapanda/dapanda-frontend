import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_SSL, // 실제 백엔드 서버 주소
  withCredentials: true,
});

export default axiosInstance;
