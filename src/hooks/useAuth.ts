import { logOutRequest } from "@apis/userProfile";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useProfileStore } from "@/stores/useProfileStore";
import { useWebSocketStore } from "@/stores/useWebSocketStore";

export function useAuth() {
  const router = useRouter();
  const token = Cookies.get("accessToken");
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const { setProfile } = useProfileStore();
  const { connect, isConnected } = useWebSocketStore();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setIsLogin(data.isLogin);

        if (data.isLogin && data.user && data.user.data) {
          setProfile(data.user.data);

          if (!isConnected) {
            console.log("로그인 성공 - 웹소켓 연결 시작");
            connect().catch((error) => {
              console.error("로그인 후 웹소켓 연결 실패:", error);
            });
          }
        } else if (data.isLogin) {
          console.log("로그인 성공했지만 사용자 데이터 없음");

          // 사용자 데이터가 없어도 로그인 상태라면 웹소켓 연결 시도
          if (!isConnected) {
            console.log("로그인 상태 확인 - 웹소켓 연결 시작");
            connect().catch((error) => {
              console.error("로그인 후 웹소켓 연결 실패:", error);
            });
          }
        } else {
          console.log("로그인되지 않음");
        }
      })
      .catch((error) => {
        console.error("로그인 상태 확인 실패:", error);
        setIsLogin(false);
      });
  }, [setProfile, token, connect, isConnected]);

  const logout = async () => {
    const res = await logOutRequest();
    console.log("ee", res.code);
    router.replace("/");
  };

  return {
    isLogin: isLogin,
    token,
    isLoading: isLogin === null,
    logout: logout,
  };
}
