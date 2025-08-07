import { create } from "zustand";
import { Client } from "@stomp/stompjs";
import type { ChatSocketMessage } from "@/feature/chat/types/chatType";
import type { AlarmMessage } from "@type/Alarm";

interface WebSocketStore {
  client: Client | null;
  isConnected: boolean;
  subscriptions: Map<number, (message: ChatSocketMessage) => void>;
  subscriptionObjects: Map<number | string, { unsubscribe: () => void }>;
  alarmSubscriptions: Map<string, (message: AlarmMessage) => void>;
  chatListUpdateCallback: ((chatRoomId?: number) => void) | null;
  activeChatRoomId: number | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  subscribe: (chatRoomId: number, onMessage: (message: ChatSocketMessage) => void) => void;
  unsubscribe: (chatRoomId: number) => void;
  sendMessage: (chatRoomId: number, message: string) => void;
  setChatListUpdateCallback: (callback: ((chatRoomId?: number) => void) | null) => void;
  setActiveChatRoomId: (chatRoomId: number | null) => void;
  updateUnreadCount: (chatRoomId?: number) => void;
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
    if (!apiBaseUrl) {
      apiBaseUrl = "http://localhost:8080";
    }

    const wsUrl = apiBaseUrl.replace(/^http/, "ws") + "/conn";

    const newClient = new Client({
      brokerURL: wsUrl,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      onConnect: () => {
        set({ isConnected: true });
        console.log("웹소켓 연결됨");
        const { subscriptions, subscriptionObjects, alarmSubscriptions } = get();
        const mergedSubscriptions = new Map(subscriptionObjects);

        // 채팅 채널 재구독
        subscriptions.forEach((callback, chatRoomId) => {
          if (!mergedSubscriptions.has(chatRoomId)) {
            const subscription = newClient.subscribe(`/sub/${chatRoomId}`, (message) => {
              const payload: ChatSocketMessage = JSON.parse(message.body);
              console.log("재연결 시 웹소켓 메시지 수신:", payload);
              callback(payload);

              // ChatContainer에서 처리하므로 여기서는 호출하지 않음
              // const { updateUnreadCount } = get();
              // console.log("재연결 시 해당 채팅방 unreadCount +1");
              // updateUnreadCount(chatRoomId);
            });
            mergedSubscriptions.set(chatRoomId, subscription);
          }
        });

        // 알람 채널 재구독
        alarmSubscriptions.forEach((callback, channelId) => {
          const oldSub = mergedSubscriptions.get(channelId);
          if (oldSub) {
            oldSub.unsubscribe();
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
    console.log(`채팅방 ${chatRoomId} 구독 시도`);

    const newSubscriptions = new Map(subscriptions);
    newSubscriptions.set(chatRoomId, onMessage);
    set({ subscriptions: newSubscriptions });

    if (!client || !client.connected || subscriptionObjects.has(chatRoomId)) {
      console.log(`채팅방 ${chatRoomId} 구독 실패:`, {
        client: !!client,
        connected: client?.connected,
        alreadySubscribed: subscriptionObjects.has(chatRoomId),
      });
      return;
    }

    const subscription = client.subscribe(`/sub/${chatRoomId}`, (message) => {
      try {
        const payload: ChatSocketMessage = JSON.parse(message.body);
        console.log("웹소켓 메시지 수신:", payload);
        onMessage(payload);

        // ChatContainer에서 처리하므로 여기서는 호출하지 않음
        // const { updateUnreadCount } = get();
        // console.log("해당 채팅방 unreadCount +1");
        // updateUnreadCount(chatRoomId);
      } catch (e) {
        console.error("채팅 메시지 파싱 오류:", e);
      }
    });

    const newSubscriptionObjects = new Map(subscriptionObjects);
    newSubscriptionObjects.set(chatRoomId, subscription);
    set({ subscriptionObjects: newSubscriptionObjects });
    console.log(`채팅방 ${chatRoomId} 구독 성공`);
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
        if (!message || typeof message !== "string") {
          return;
        }

        client.publish({
          destination: `/pub/${chatRoomId}`,
          body: message,
        });
      } catch (e) {
        console.error("채팅 메시지 전송 실패:", e);
      }
    } else {
      console.warn("WebSocket이 연결되지 않았습니다.");
    }
  },

  setChatListUpdateCallback: (callback) => {
    set({ chatListUpdateCallback: callback });
  },

  setActiveChatRoomId: (chatRoomId) => {
    set({ activeChatRoomId: chatRoomId });
  },

  updateUnreadCount: (chatRoomId?: number) => {
    if (chatRoomId) {
      // 특정 채팅방의 unreadCount만 +1
      const { chatListUpdateCallback } = get();
      console.log(`채팅방 ${chatRoomId}의 unreadCount +1`);
      chatListUpdateCallback?.(chatRoomId);
    } else {
      // 전체 채팅 목록 업데이트 (기존 방식)
      const { chatListUpdateCallback } = get();
      console.log("전체 채팅 목록 업데이트");
      chatListUpdateCallback?.();
    }
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
        console.error("WebSocket 메시지 파싱 오류:", e, message.body);
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
