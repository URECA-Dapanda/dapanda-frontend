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
      .then((res) => res.json())
      .then((data) => {
        setIsLogin(data.isLogin);

        if (data.isLogin && data.user) {
          setProfile(data.user);
        }
      })
      .catch(() => setIsLogin(false));
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
  };
}
