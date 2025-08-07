import Image from "next/image";

export default function SocialButton({ provider }: { provider: "kakao" | "naver" | "google" }) {
  const handleLogin = () => {
    const baseUrl =
      provider === "google"
        ? process.env.NEXT_PUBLIC_API_BASE
        : process.env.NEXT_PUBLIC_API_BASE_SSL;
    const kakaoAuthUrl = `${baseUrl}/oauth2/authorization/${provider}`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <button onClick={handleLogin} className="w-fit h-full flex self-center hover:cursor-pointer">
      <Image
        priority={true}
        src={`/${provider}Button.svg`}
        alt="카카오 로그인 버튼"
        width={300}
        height={0}
      />
    </button>
  );
}
