import KakaoLoginButton from "@components/common/KakaoLoginButton";
import { Wifi } from "lucide-react";

export default function LandingPageContent() {
  return (
    <div className="w-full max-w-sm mx-auto min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col">
      {/* Logo Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
          <Wifi className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">DaPanDa</h1>
        <p className="text-gray-600 text-center mb-8">
          데이터와 와이파이를 자유롭게
          <br />
          거래하는 플랫폼
        </p>
        <KakaoLoginButton />
      </div>
    </div>
  );
}
