import { useEffect } from "react";
import { useWebSocketStore } from "@/stores/useWebSocketStore";
import { useProfileStore } from "@/stores/useProfileStore";

export const useWebSocketConnection = () => {
  const { connect, disconnect, isConnected } = useWebSocketStore();
  const { id: userId } = useProfileStore();

  // 프로필 스토어의 전체 상태를 확인
  const profileState = useProfileStore.getState();
  console.log("프로필 스토어 상태:", profileState);

  useEffect(() => {
    if (userId && !isConnected) {
      console.log("웹소켓 연결 시작...");
      connect().catch((error) => {
        console.error("WebSocket 연결 실패:", error);
      });
    } else {
      if (!userId) {
        console.log("사용자 ID가 없습니다. 로그인이 필요합니다.");
      }
      if (isConnected) {
        console.log("이미 웹소켓이 연결되어 있습니다.");
      }
    }

    // 컴포넌트 언마운트 시 연결 해제 (앱 종료 시)
    return () => {
      // 앱 전체가 종료되는 경우에만 연결 해제, 개별 페이지 이동 시에는 연결 유지
    };
  }, [userId, isConnected, connect, profileState]);

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
