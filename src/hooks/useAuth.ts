import { logOutRequest } from "@apis/userProfile";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useProfileStore } from "@/stores/useProfileStore";

export function useAuth() {
  const router = useRouter();
  const token = Cookies.get("accessToken");
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const { setProfile } = useProfileStore();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setIsLogin(data.isLogin);

        if (data.isLogin && data.user) {
          setProfile(data.user);
        } else if (data.isLogin) {
          console.log("로그인 성공했지만 사용자 데이터 없음");
        } else {
          console.log("로그인되지 않음");
        }
      })
      .catch(() => {
        setIsLogin(false);
      });
  }, [setProfile, token]);

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
