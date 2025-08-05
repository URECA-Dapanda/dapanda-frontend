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
      .then(async (data) => {
        setIsLogin(data.isLogin);
        return getUserInfo();
      })
      .then((userData) => {
        if (userData && userData.data) {
          setUser(userData.data);
          setProfile(userData.data);
          if (!isConnected) {
            connect().catch((error) => {
              console.error("웹소켓 연결 실패:", error);
            });
          }
        }
      })
      .catch(() => setIsLogin(false));
  }, []);

  const logout = async () => {
    await logOutRequest();
    setUser(null);
    router.replace("/");
  };

  return {
    isLogin: isLogin,
    isLoading: isLogin === null,
    logout: logout,
    user,
  };
}
