import { logOutRequest, getUserInfo } from "@apis/userProfile";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useProfileStore } from "@/stores/useProfileStore";
import type { UserType } from "@/types/User";
import { useWebSocketStore } from "@/stores/useWebSocketStore";

export function useAuth() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const { connect, isConnected } = useWebSocketStore();
  const [user, setUser] = useState<UserType | null>(null);
  const { setProfile } = useProfileStore();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        setIsLogin(data.isLogin);
        if (data.isLogin && data.user) {
          setUser(data.user.data);
          setProfile(data.user);
        }
      })
      .catch((e) => {
        console.error("/api/auth/me 실패:", e);
        setIsLogin(false);
      });
  }, [setProfile]);

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
    user,
  };
}
