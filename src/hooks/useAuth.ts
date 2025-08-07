import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logOutRequest } from "@apis/userProfile";
import { useProfileStore } from "@/stores/useProfileStore";
import { useWebSocketStore } from "@/stores/useWebSocketStore";
import type { UserType } from "@/types/User";

export function useAuth() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const connect = useWebSocketStore((store) => store.connect);
  const isConnected = useWebSocketStore((store) => store.isConnected);
  const [user, setUser] = useState<UserType | null>(null);
  const { setProfile } = useProfileStore();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then(async (data) => {
        setIsLogin(data.isLogin);
        if (data && data.user) {
          setUser(data.user);
          setProfile(data.user);
          if (!isConnected) {
            connect().catch((error) => {
              console.debug("웹소켓 연결 실패:", error);
            });
          }
        }
      })
      .catch(() => setIsLogin(false));
  }, [connect, isConnected, setProfile]);

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
