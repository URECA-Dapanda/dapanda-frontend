import axios from "axios";

// 로컬 개발 환경에서는 HTTP 사용
let baseURL = process.env.NEXT_PUBLIC_API_BASE_SSL;
if (baseURL && baseURL.includes("localhost")) {
  baseURL = baseURL.replace("https://", "http://");
}

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default axiosInstance;
