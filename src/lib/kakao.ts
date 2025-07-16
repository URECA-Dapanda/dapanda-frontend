declare global {
  interface Window {
    Kakao: any;
  }
}

export const initKakao = () => {
  if (typeof window === "undefined") return;

  if (!window.Kakao?.isInitialized?.()) {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY);
  }
};
