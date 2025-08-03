import { logOutRequest } from "@apis/userProfile";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useProfileStore } from "@/stores/useProfileStore";
import type { UserType } from "@/types/User";

export function useAuth() {
  const router = useRouter();
  const token = Cookies.get("accessToken");
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const { setProfile } = useProfileStore();

  useEffect(() => {
    console.log("🧪 /api/auth/me 요청 시작");
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        console.log("🎯 /api/auth/me 응답:", data);
        setIsLogin(data.isLogin);
        if (data.isLogin && data.user) {
          setUser(data.user.data); // ✅ 상태 저장
          setProfile(data.user); // 기존 유지
        }
      })
      .catch((e) => {
        console.error("❌ /api/auth/me 실패:", e);
        setIsLogin(false);
      });
  }, [setProfile]);

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
    user,
  };
}
