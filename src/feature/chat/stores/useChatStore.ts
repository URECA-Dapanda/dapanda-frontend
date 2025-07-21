import { create } from "zustand";

export interface ChatRoomPreview {
  chatRoomId: number;
  name: string;
  title: string;
  price: number;
  lastMessage: string;
  updatedAt: string;
}

interface ChatStore {
  chatList: ChatRoomPreview[];
  addChatRoom: (room: ChatRoomPreview) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  chatList: [],
  addChatRoom: (room: ChatRoomPreview) =>
    set((state: ChatStore) => ({
      chatList: [room, ...state.chatList.filter((r) => r.chatRoomId !== room.chatRoomId)],
    })),
}));
