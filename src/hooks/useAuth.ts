import { logOutRequest, getUserInfo } from "@apis/userProfile";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useProfileStore } from "@/stores/useProfileStore";
import { useWebSocketStore } from "@/stores/useWebSocketStore";

export function useAuth() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const { connect, isConnected } = useWebSocketStore();
  const { setProfile } = useProfileStore();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const userData = await getUserInfo();

        if (userData && userData.data) {
          setIsLogin(true);
          setProfile(userData.data);

          if (!isConnected) {
            connect().catch((error) => {
              console.error("웹소켓 연결 실패:", error);
            });
          }
        } else {
          setIsLogin(false);
        }
      } catch (error) {
        console.error("인증 상태 확인 실패:", error);
        setIsLogin(false);
      }
    };

    checkAuthStatus();
  }, [connect, setProfile]);

  const logout = async () => {
    await logOutRequest();
    router.replace("/");
  };

  return {
    isLogin: isLogin,
    isLoading: isLogin === null,
    logout: logout,
  };
}
