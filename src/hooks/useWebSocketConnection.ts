import { useWebSocketStore } from "@/stores/useWebSocketStore";
import { useProfileStore } from "@/stores/useProfileStore";

export const useWebSocketConnection = () => {
  const disconnect = useWebSocketStore((store) => store.disconnect);
  const isConnected = useWebSocketStore((store) => store.isConnected);

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
