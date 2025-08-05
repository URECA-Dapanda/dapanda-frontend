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
  alarmSubscriptions: Map<string, (message: AlarmMessage) => void>;
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
  alarmSubscriptions: new Map(),
  chatListUpdateCallback: null,
  activeChatRoomId: null,

  connect: async () => {
    const { client, isConnected } = get();
    if (client?.connected || isConnected) return;

    let apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_SSL;
    if (apiBaseUrl?.includes("localhost")) {
      apiBaseUrl = apiBaseUrl.replace("https://", "http://");
    } else if (!apiBaseUrl) {
      apiBaseUrl = "http://localhost:8080";
    }

    const newClient = new Client({
      webSocketFactory: () =>
        new SockJS(`${apiBaseUrl}/conn`, null, {
          transports: ["websocket", "xhr-streaming", "xhr-polling"],
          timeout: 30000,
        }),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      onConnect: () => {
        set({ isConnected: true });

        const { subscriptions, subscriptionObjects, alarmSubscriptions } = get();

        const mergedSubscriptions = new Map(subscriptionObjects);

        // 채팅 채널 재구독
        subscriptions.forEach((callback, chatRoomId) => {
          if (!mergedSubscriptions.has(chatRoomId)) {
            const subscription = newClient.subscribe(`/sub/${chatRoomId}`, (message) => {
              const payload: ChatSocketMessage = JSON.parse(message.body);
              callback(payload);
            });
            mergedSubscriptions.set(chatRoomId, subscription);
          }
        });

        // 알람 채널 재구독
        alarmSubscriptions.forEach((callback, channelId) => {
          // ❗구독 객체가 있든 없든 무조건 다시 subscribe (기존 구독 해제 후 재등록)
          const oldSub = mergedSubscriptions.get(channelId);
          if (oldSub) {
            oldSub.unsubscribe(); // 기존 구독 해제
          }

          const subscription = newClient.subscribe(`/sub/${channelId}`, (message) => {
            try {
              const raw = JSON.parse(message.body);

              const payload: AlarmMessage = {
                tradeId: raw.tradeId,
                memberId: raw.memberId,
                startTime: raw.startTime,
                endTime: raw.endTime,
                eventState: raw.eventState,
              };

              callback(payload);
            } catch (e) {
              console.error("🚨 WebSocket 메시지 파싱 오류:", e, message.body);
            }
          });

          mergedSubscriptions.set(channelId, subscription);
        });

        set({ subscriptionObjects: mergedSubscriptions });
      },

      onDisconnect: () => {
        set({ isConnected: false, subscriptionObjects: new Map() });
      },

      onStompError: (frame) => {
        set({ isConnected: false, subscriptionObjects: new Map() });

        if (frame.headers["message"] !== "Authentication failed") {
          setTimeout(() => {
            const { client } = get();
            if (client && !client.connected) {
              client.activate();
            }
          }, 5000);
        }
      },
    });

    newClient.activate();
    set({ client: newClient });
  },

  disconnect: () => {
    const { client, subscriptionObjects } = get();
    if (client) {
      subscriptionObjects.forEach((subscription) => subscription.unsubscribe());
      client.deactivate();
    }

    set({
      client: null,
      isConnected: false,
      subscriptions: new Map(),
      subscriptionObjects: new Map(),
    });
  },

  subscribe: (chatRoomId, onMessage) => {
    const { client, subscriptions, subscriptionObjects } = get();

    const newSubscriptions = new Map(subscriptions);
    newSubscriptions.set(chatRoomId, onMessage);
    set({ subscriptions: newSubscriptions });

    if (!client || !client.connected || subscriptionObjects.has(chatRoomId)) return;

    const subscription = client.subscribe(`/sub/${chatRoomId}`, (message) => {
      try {
        const payload: ChatSocketMessage = JSON.parse(message.body);
        onMessage(payload);
      } catch (e) {
        console.error("채팅 메시지 파싱 오류:", e);
      }
    });

    const newSubscriptionObjects = new Map(subscriptionObjects);
    newSubscriptionObjects.set(chatRoomId, subscription);
    set({ subscriptionObjects: newSubscriptionObjects });
  },

  unsubscribe: (chatRoomId) => {
    const { subscriptions, subscriptionObjects } = get();

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

  sendMessage: (chatRoomId, message) => {
    const { client } = get();
    if (client?.connected) {
      try {
        client.publish({
          destination: `/pub/${chatRoomId}`,
          body: message,
        });
      } catch (e) {
        console.error("채팅 메시지 전송 실패:", e);
      }
    }
  },

  setChatListUpdateCallback: (callback) => {
    set({ chatListUpdateCallback: callback });
  },

  setActiveChatRoomId: (chatRoomId) => {
    set({ activeChatRoomId: chatRoomId });
  },

  updateUnreadCount: () => {
    const { chatListUpdateCallback } = get();
    chatListUpdateCallback?.();
  },

  subscribeToChannel: (channelId, onMessage) => {
    const { client, subscriptionObjects, alarmSubscriptions } = get();
    const fullPath = `/sub/${channelId}`;

    const newSubscriptionObjects = new Map(subscriptionObjects);
    const newAlarmSubscriptions = new Map(alarmSubscriptions);

    const oldSub = newSubscriptionObjects.get(channelId);
    if (oldSub) {
      oldSub.unsubscribe();
      newSubscriptionObjects.delete(channelId);
    }

    if (!client?.connected) {
      newAlarmSubscriptions.set(channelId, onMessage);
      set({ alarmSubscriptions: newAlarmSubscriptions });
      return;
    }

    const subscription = client.subscribe(fullPath, (message) => {
      try {
        const raw = JSON.parse(message.body);

        const payload: AlarmMessage = {
          tradeId: raw.tradeId,
          memberId: raw.memberId,
          startTime: raw.startTime,
          endTime: raw.endTime,
          eventState: raw.eventState,
        };

        onMessage(payload);
      } catch (e) {
        console.error("🚨 WebSocket 메시지 파싱 오류:", e, message.body);
      }
    });

    newSubscriptionObjects.set(channelId, subscription);
    newAlarmSubscriptions.set(channelId, onMessage);

    set({
      subscriptionObjects: newSubscriptionObjects,
      alarmSubscriptions: newAlarmSubscriptions,
    });
  },
}));
