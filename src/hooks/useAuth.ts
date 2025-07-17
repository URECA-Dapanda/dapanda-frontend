import Cookies from "js-cookie";

export function useAuth() {
  const token = Cookies.get("accessToken");
  return {
    isLogin: !!token,
    token,
  };
}
