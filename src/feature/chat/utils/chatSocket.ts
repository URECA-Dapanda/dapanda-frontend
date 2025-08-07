import { Client } from "@stomp/stompjs";
import type { ChatSocketMessage } from "@/feature/chat/types/chatType";

export const createStompClient = (
  chatRoomId: number,
  onMessage: (message: ChatSocketMessage) => void
) => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_SSL;
  if (!apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_SSL environment variable is required");
  }

  const client = new Client({
    brokerURL: `${apiBaseUrl.replace(/^http/, "ws")}/conn`,
    reconnectDelay: 5000,
    onConnect: () => {
      client.subscribe(`/sub/${chatRoomId}`, (message) => {
        const payload: ChatSocketMessage = JSON.parse(message.body);
        onMessage(payload);
      });
    },
    onStompError: (frame) => {
      console.debug("STOMP 오류", frame.headers["message"]);
    },
  });

  client.activate();
  return client;
};

export const sendMessage = (client: Client, chatRoomId: number, message: string) => {
  client.publish({
    destination: `/pub/${chatRoomId}`,
    body: message,
  });
};
