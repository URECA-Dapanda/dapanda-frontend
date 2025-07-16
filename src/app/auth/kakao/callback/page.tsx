"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function KakaoCallbackPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      // 여기서 백엔드에 code 전달 또는 access_token 교환 로직
      console.log("카카오 로그인 인가 코드:", code);
      
    }
  }, [searchParams]);

  return <div>카카오 로그인 중...</div>;
}
