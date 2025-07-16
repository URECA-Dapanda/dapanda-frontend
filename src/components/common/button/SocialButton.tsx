export default function SocialButton({ provider }: { provider: "kakao" | "naver" | "google" }) {
  const handleLogin = () => {
    const kakaoAuthUrl = `${process.env.NEXT_PUBLIC_API_BASE}/oauth2/authorization/${provider}`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <button onClick={handleLogin}>
      <img src={`/${provider}Button.svg`} alt="카카오 로그인 버튼" width={222} />
    </button>
  );
}
