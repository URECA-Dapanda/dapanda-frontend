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
