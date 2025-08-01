import { create } from "zustand";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import type { ChatSocketMessage } from "@/feature/chat/types/chatType";

interface WebSocketStore {
  client: Client | null;
  isConnected: boolean;
  subscriptions: Map<number, (message: ChatSocketMessage) => void>;
  subscriptionObjects: Map<number, { unsubscribe: () => void }>;
  chatListUpdateCallback: (() => void) | null;
  activeChatRoomId: number | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  subscribe: (chatRoomId: number, onMessage: (message: ChatSocketMessage) => void) => void;
  unsubscribe: (chatRoomId: number) => void;
  sendMessage: (chatRoomId: number, message: string) => void;
  setChatListUpdateCallback: (callback: (() => void) | null) => void;
  setActiveChatRoomId: (chatRoomId: number | null) => void;
  updateUnreadCount: () => void;
}

export const useWebSocketStore = create<WebSocketStore>((set, get) => ({
  client: null,
  isConnected: false,
  subscriptions: new Map(),
  subscriptionObjects: new Map(),
  chatListUpdateCallback: null,
  activeChatRoomId: null,

  connect: async () => {
    const { client } = get();
    if (client && client.connected) return;

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_SSL;
    if (!apiBaseUrl) {
      throw new Error("NEXT_PUBLIC_API_BASE_SSL 환경변수가 필요함");
    }

    const newClient = new Client({
      webSocketFactory: () => {
        const sock = new SockJS(`${apiBaseUrl}/conn`, null, {
          transports: ["websocket", "xhr-streaming", "xhr-polling"],
          timeout: 30000,
        });

        return sock;
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        set({ isConnected: true });

        // 기존 구독들을 다시 등록
        const { subscriptions, subscriptionObjects } = get();
        const newSubscriptionObjects = new Map(subscriptionObjects);

        subscriptions.forEach((callback, chatRoomId) => {
          // 이미 구독 객체가 있으면 건너뛰기
          if (newSubscriptionObjects.has(chatRoomId)) {
            return;
          }

          const subscription = newClient.subscribe(`/sub/${chatRoomId}`, (message) => {
            const payload: ChatSocketMessage = JSON.parse(message.body);
            callback(payload);
          });
          newSubscriptionObjects.set(chatRoomId, subscription);
        });

        set({ subscriptionObjects: newSubscriptionObjects });
      },
      onDisconnect: () => {
        set({ isConnected: false, subscriptionObjects: new Map() });
      },
      onStompError: (frame) => {
        console.error("STOMP 오류:", frame.headers["message"]);
        set({ isConnected: false, subscriptionObjects: new Map() });

        setTimeout(() => {
          const { client } = get();
          if (client && !client.connected) {
            client.activate();
          }
        }, 5000);
      },
    });

    newClient.activate();
    set({ client: newClient });
  },

  disconnect: () => {
    const { client, subscriptionObjects } = get();
    if (client) {
      subscriptionObjects.forEach((subscription) => {
        subscription.unsubscribe();
      });

      client.deactivate();
      set({
        client: null,
        isConnected: false,
        subscriptions: new Map(),
        subscriptionObjects: new Map(),
      });
    }
  },

  subscribe: (chatRoomId: number, onMessage: (message: ChatSocketMessage) => void) => {
    const { client, subscriptions, subscriptionObjects } = get();

    // 이미 구독 중인지 확인 (구독 정보와 구독 객체 모두 확인)
    if (subscriptions.has(chatRoomId) && subscriptionObjects.has(chatRoomId)) {
      const newSubscriptions = new Map(subscriptions);
      newSubscriptions.set(chatRoomId, onMessage);
      set({ subscriptions: newSubscriptions });
      return;
    }

    // WebSocket이 연결되지 않은 경우 구독 정보만 저장
    if (!client || !client.connected) {
      const newSubscriptions = new Map(subscriptions);
      newSubscriptions.set(chatRoomId, onMessage);
      set({ subscriptions: newSubscriptions });
      return;
    }

    // 구독 정보 저장
    const newSubscriptions = new Map(subscriptions);
    newSubscriptions.set(chatRoomId, onMessage);
    set({ subscriptions: newSubscriptions });

    // STOMP 구독 생성
    const subscriptionPath = `/sub/${chatRoomId}`;

    const subscription = client.subscribe(subscriptionPath, (message) => {
      try {
        const payload: ChatSocketMessage = JSON.parse(message.body);
        onMessage(payload);
      } catch (error) {
        console.error("메시지 파싱 오류:", error);
      }
    });

    const newSubscriptionObjects = new Map(subscriptionObjects);
    newSubscriptionObjects.set(chatRoomId, subscription);
    set({ subscriptionObjects: newSubscriptionObjects });
  },

  unsubscribe: (chatRoomId: number) => {
    const { subscriptions, subscriptionObjects } = get();

    // 구독 정보와 구독 객체 모두 정리
    const newSubscriptions = new Map(subscriptions);
    newSubscriptions.delete(chatRoomId);

    const newSubscriptionObjects = new Map(subscriptionObjects);
    const subscription = newSubscriptionObjects.get(chatRoomId);
    if (subscription) {
      subscription.unsubscribe();
      newSubscriptionObjects.delete(chatRoomId);
    }

    set({
      subscriptions: newSubscriptions,
      subscriptionObjects: newSubscriptionObjects,
    });
  },

  sendMessage: (chatRoomId: number, message: string) => {
    const { client } = get();

    if (client && client.connected) {
      try {
        client.publish({
          destination: `/pub/${chatRoomId}`,
          body: message,
        });
      } catch (error) {
        console.error("메시지 전송 중 오류:", error);
      }
    } else {
      console.error("WebSocket이 연결되지 않았습니다.");
    }
  },

  setChatListUpdateCallback: (callback: (() => void) | null) => {
    set({ chatListUpdateCallback: callback });
  },

  setActiveChatRoomId: (chatRoomId: number | null) => {
    set({ activeChatRoomId: chatRoomId });
  },

  updateUnreadCount: () => {
    const { chatListUpdateCallback } = get();
    if (chatListUpdateCallback) {
      chatListUpdateCallback();
    }
  },
}));
