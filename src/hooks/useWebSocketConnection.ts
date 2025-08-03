import { useWebSocketStore } from "@/stores/useWebSocketStore";
import { useProfileStore } from "@/stores/useProfileStore";

export const useWebSocketConnection = () => {
  const { disconnect, isConnected } = useWebSocketStore();

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
