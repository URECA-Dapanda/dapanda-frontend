import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.dapanda.org/", // 실제 백엔드 서버 주소
  withCredentials: true,
});

export default axiosInstance;
