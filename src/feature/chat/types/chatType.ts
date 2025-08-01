export type ApiChatRoom = {
  chatRoomId: number;
  lastMessageAt: string;
  lastMessage?: string;
  senderId: number;
  senderName: string;
  senderProfileImageUrl: string;
  productId: number;
  itemId: number;
  itemType: string;
  startTime: number;
  endTime: number;
  unreadCount?: number;
};

export interface ContentInfoType {
  id: number;
  productId: number;
}
export interface ChatSocketMessage {
  chatMessageId: number | string;
  message: string;
  createdAt: string;
  isMine: boolean;
  senderName?: string;
  unreadCount?: number;
  senderId?: number;
}

export interface CursorPageResponse<T> {
  content: T[];
  nextCursorId?: number;
  hasNext?: boolean;
  size?: number;
}
