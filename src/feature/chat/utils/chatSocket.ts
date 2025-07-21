import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const createStompClient = (chatRoomId: number, onMessage: (message: string) => void) => {
  const client = new Client({
    webSocketFactory: () => new SockJS(`${process.env.NEXT_PUBLIC_API_BASE_URL}/connect`),
    reconnectDelay: 5000,
    onConnect: () => {
      console.log(" WebSocket 연결됨");

      client.subscribe(`/topic/${chatRoomId}`, (message) => {
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
