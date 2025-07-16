"use client";

import { useEffect } from "react";
import { initKakao } from "@/lib/kakao";

export default function KakaoLoginButton() {
  useEffect(() => {
    initKakao();
  }, []);

  const handleLogin = () => {
    if (!window.Kakao) return;

    window.Kakao.Auth.authorize({
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
    });
  };

  return (
    <button onClick={handleLogin}>
      <img
        src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
        alt="카카오 로그인 버튼"
        width={222}
      />
    </button>
  );
}
