import { useEffect } from "react";
import { useWebSocketStore } from "@/stores/useWebSocketStore";
import { useProfileStore } from "@/stores/useProfileStore";
import { useAuth } from "./useAuth";

export const useWebSocketConnection = () => {
  const connect = useWebSocketStore((store) => store.connect);
  const disconnect = useWebSocketStore((store) => store.disconnect);
  const isConnected = useWebSocketStore((store) => store.isConnected);
  const { id: userId } = useProfileStore();
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.memberId) return;
    if (!isConnected) {
      connect().catch((error) => {
        console.error("WebSocket 연결 실패:", error);
      });
    }
    if (userId && !isConnected) {
      connect().catch((error) => {
        console.error("WebSocket 연결 실패:", error);
      });
    }

    // 컴포넌트 언마운트 시 연결 해제 (앱 종료 시)
    return () => {
      // 앱 전체가 종료되는 경우에만 연결 해제, 개별 페이지 이동 시에는 연결 유지
    };
  }, [userId, isConnected, connect, user]);

  const disconnectOnLogout = () => {
    disconnect();
    useProfileStore.getState().setProfile({
      memberId: 0,
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
