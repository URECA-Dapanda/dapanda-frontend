import { create } from "zustand";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import type { ChatSocketMessage } from "@/feature/chat/types/chatType";
import type { AlarmMessage } from "@type/Alarm";

interface WebSocketStore {
  client: Client | null;
  isConnected: boolean;
  subscriptions: Map<number, (message: ChatSocketMessage) => void>;
  subscriptionObjects: Map<number | string, { unsubscribe: () => void }>;
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
  subscribeToChannel: (channelId: string, onMessage: (message: AlarmMessage) => void) => void;
}

export const useWebSocketStore = create<WebSocketStore>((set, get) => ({
  client: null,
  isConnected: false,
  subscriptions: new Map(),
  subscriptionObjects: new Map(),
  chatListUpdateCallback: null,
  activeChatRoomId: null,

  connect: async () => {
    console.log("🧪 connect 함수 내부 진입");
    const { client } = get();
    if (client && client.connected) {
      console.log("기존 클라이언트 상태", client, client?.connected);
      return;
    }
    console.log("🌍 apiBaseUrl:", process.env.NEXT_PUBLIC_API_BASE_SSL);

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_SSL;
    if (!apiBaseUrl) {
      throw new Error("NEXT_PUBLIC_API_BASE_SSL 환경변수가 필요함");
    }

    const newClient = new Client({
      brokerURL: undefined, // 반드시 undefined로!
      connectHeaders: {
        login: "guest",
        passcode: "guest",
      },
      debug: (str) => {
        console.log("[STOMP DEBUG]:", str);
      },
      webSocketFactory: () => {
        const sock = new SockJS(`${apiBaseUrl}/conn`, null, {
          transports: ["websocket", "xhr-streaming", "xhr-polling"],
          timeout: 30000,
        });
        console.log("✅ SockJS 연결 시도");
        return sock;
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log("✅ WebSocket 연결 성공");
        set({ isConnected: true });
      },
      onStompError: (frame) => {
        console.error("❌ STOMP 오류:", frame.headers["message"]);
        console.error("❗ BODY:", frame.body);
      },
      onWebSocketError: (event) => {
        console.error("❌ WebSocket 에러:", event);
      },
      onWebSocketClose: (event) => {
        console.warn("⚠️ WebSocket 연결 종료됨:", event);
      },
    });

    newClient.activate();
    console.log("🚀 STOMP 클라이언트 activate 호출됨");
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

  subscribeToChannel: (channelId, onMessage) => {
    const { client, subscriptionObjects } = get();

    if (!client || !client.connected) {
      console.warn("WebSocket이 연결되지 않았습니다. 연결 후 구독하세요.");
      return;
    }

    if (subscriptionObjects.has(channelId)) {
      console.log("이미 구독된 채널입니다:", channelId);
      return;
    }

    const subscription = client.subscribe(`/sub/${channelId}`, (message) => {
      try {
        console.log("📩 수신된 메시지 원문:", message.body); // ✅ 추가
        const payload: AlarmMessage = JSON.parse(message.body);
        console.log("🛎 알림 수신된 파싱된 객체:", payload); // ✅ 추가
        onMessage(payload);
      } catch (error) {
        console.error("알림 메시지 파싱 실패:", error); // ✅ 이미 있었음
      }
    });

    const newSubscriptionObjects = new Map(subscriptionObjects);
    newSubscriptionObjects.set(channelId, subscription);
    set({ subscriptionObjects: newSubscriptionObjects });
  },
}));
