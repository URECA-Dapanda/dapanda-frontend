import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SocialButton from "@components/common/button/SocialButton";
import LayoutBox from "@components/common/container/LayoutBox";
import { useAuth } from "@hooks/useAuth";
import Image from "next/image";

export default function LandingPageContent() {
  const router = useRouter();
  const { isLogin } = useAuth();

  useEffect(() => {
    if (isLogin) {
      router.push("/data");
    }
  }, [isLogin]);

  return (
    <div className="w-full lg:w-[600px] mx-auto h-main-safe bg-gradient-to-b from-[#f5e6f3] via-[#f0e1f1] to-[#ede0f0] flex flex-col items-center justify-center relative overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center h-full gap-48">
        <div className="mb-12">
          <Image
            src="/dpd-logo-fit.svg"
            alt="DPD Logo"
            width={350}
            height={0}
            priority={true}
            className="mx-auto mb-[-32px]"
            style={{ filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.1))" }}
          />
        </div>
        <p className="body-md text-center">데이터를 자유롭게 거래하는 플랫폼</p>

        <LayoutBox direction="column" layout="flex" gap={12}>
          <SocialButton provider="kakao" />
          <SocialButton provider="google" />
        </LayoutBox>
      </div>
    </div>
  );
}
