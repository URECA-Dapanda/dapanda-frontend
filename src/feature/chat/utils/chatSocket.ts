import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const createStompClient = (chatRoomId: number, onMessage: (message: string) => void) => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL environment variable is required");
  }
  const client = new Client({
    webSocketFactory: () => new SockJS(`${apiBaseUrl}/conn`),
    reconnectDelay: 5000,
    onConnect: () => {
      console.log(" WebSocket 연결됨");

      client.subscribe(`/sub/${chatRoomId}`, (message) => {
        const payload = JSON.parse(message.body);
        onMessage(payload);
      });
    },
    onStompError: (frame) => {
      console.error(" STOMP 오류", frame.headers["message"]);
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
