import { useEffect } from "react";
import { useWebSocketStore } from "@/stores/useWebSocketStore";
import { useProfileStore } from "@/stores/useProfileStore";

export const useWebSocketConnection = () => {
  const { disconnect, isConnected } = useWebSocketStore();

  useEffect(() => {
    return () => {
      // 페이지 이동 시에는 연결 유지, 앱 종료 시에만 해제
    };
  }, []);

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
