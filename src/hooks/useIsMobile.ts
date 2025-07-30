import { useEffect, useState } from "react";

interface UAData {
  mobile: boolean;
}

export function useIsRealMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      if (typeof navigator === "undefined") {
        setIsMobile(false);
        return;
      }

      // 타입 단언을 통해 TS 오류 방지
      const uaData = (navigator as Navigator & { userAgentData?: UAData }).userAgentData;

      if (uaData && typeof uaData.mobile === "boolean") {
        setIsMobile(uaData.mobile);
        return;
      }

      // fallback: userAgent 문자열 검사
      const ua = navigator.userAgent;
      const isMobileUA = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
      setIsMobile(isMobileUA);
    };

    checkIsMobile();
  }, []);

  return isMobile;
}
