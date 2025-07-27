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
}

interface ChatStore {
  chatList: ChatRoomPreview[];
  addChatRoom: (room: ChatRoomPreview) => void;
  setChatList: (rooms: ChatRoomPreview[]) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  chatList: [],
  addChatRoom: (room: ChatRoomPreview) =>
    set((state: ChatStore) => ({
      chatList: [room, ...state.chatList.filter((r) => r.chatRoomId !== room.chatRoomId)],
    })),
  setChatList: (list: ChatRoomPreview[]) => set({ chatList: list }),
}));
