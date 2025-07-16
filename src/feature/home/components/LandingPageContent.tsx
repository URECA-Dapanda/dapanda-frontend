import SocialButton from "@components/common/button/SocialButton";
import ContainerBox from "@components/common/container/ContainerBox";

export default function LandingPageContent() {
  return (
    <div className="w-full max-w-sm mx-auto min-h-screen bg-gradient-to-b from-[#f5e6f3] via-[#f0e1f1] to-[#ede0f0] flex flex-col items-center justify-center p-32 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-80 left-32 w-64 h-32 opacity-30">
        <svg viewBox="0 0 64 32" fill="none"></svg>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* DPD Main Logo */}
        <div className="mb-32">
          <img
            src="/dpd-main-logo.png"
            alt="DPD Logo"
            className="w-[341px] h-auto mx-auto"
            style={{ filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.1))" }}
          />
        </div>

        {/* Subtitle */}
        <p className="body-sm mb-28 text-center">데이터를 자유롭게 거래하는 플랫폼</p>
        <ContainerBox direction="colomn" gap="12">
          <SocialButton provider="kakao" />
          <SocialButton provider="naver" />
          <SocialButton provider="google" />
        </ContainerBox>
      </div>
    </div>
  );
}
