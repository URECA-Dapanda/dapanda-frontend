import { create } from "zustand";

export interface ChatRoomPreview {
  itemId: number;
  chatRoomId: number;
  name: string;
  title: string;
  price: number;
  updatedAt: string;
  productId: number;
  senderName: string;
  avatarUrl: string;
  senderId: number;
  lastMessage?: string;
  unreadCount?: number;
}

interface ChatStore {
  chatList: ChatRoomPreview[];
  addChatRoom: (room: ChatRoomPreview) => void;
  setChatList: (
    rooms: ChatRoomPreview[] | ((prev: ChatRoomPreview[]) => ChatRoomPreview[])
  ) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  chatList: [],
  addChatRoom: (room: ChatRoomPreview) =>
    set((state: ChatStore) => ({
      chatList: [room, ...state.chatList.filter((r) => r.chatRoomId !== room.chatRoomId)],
    })),
  setChatList: (list) =>
    set((state) => ({
      chatList: typeof list === "function" ? list(state.chatList) : list,
    })),
}));
