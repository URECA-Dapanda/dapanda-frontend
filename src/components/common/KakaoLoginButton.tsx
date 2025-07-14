import { useRouter } from "next/navigation";
import { ButtonComponent } from "@components/common/button";

export default function KakaoLoginButton() {
  const router = useRouter();

  const handleKakaoLogin = () => {
    router.push("/");
  };

  return (
    <ButtonComponent
      onClick={handleKakaoLogin}
      className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium mb-4"
    >
      <span className="mr-2">💬</span>
      카카오로 시작하기
    </ButtonComponent>
  );
}
