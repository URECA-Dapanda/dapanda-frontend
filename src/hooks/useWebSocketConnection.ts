import { useEffect } from "react";
import { useWebSocketStore } from "@/stores/useWebSocketStore";
import { useProfileStore } from "@/stores/useProfileStore";
import Cookies from "js-cookie";

export const useWebSocketConnection = () => {
  const { connect, disconnect, isConnected } = useWebSocketStore();
  const token = Cookies.get("accessToken");

  // 프로필 스토어의 전체 상태를 확인
  const profileState = useProfileStore.getState();
  console.log("프로필 스토어 상태:", profileState);

  useEffect(() => {
    if (isConnected) {
      return;
    }

    if (token) {
      connect().catch(() => {});
    }

    // 컴포넌트 언마운트 시 연결 해제 (앱 종료 시)
    return () => {
      // 앱 전체가 종료되는 경우에만 연결 해제, 개별 페이지 이동 시에는 연결 유지
    };
  }, [token, isConnected, connect]);

  const disconnectOnLogout = () => {
    disconnect();
    useProfileStore.getState().setProfile({
      id: 0,
      name: "",
      profileImageUrl: "",
      joinedAt: "",
      averageRating: 0,
      reviewCount: 0,
      tradeCount: 0,
    });
  };

  return {
    isConnected,
    disconnectOnLogout,
  };
};
