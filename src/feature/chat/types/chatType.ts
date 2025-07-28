export type ApiChatRoom = {
  chatRoomId: number;
  createdAt: string;
  lastMessageAt: string | null;
  senderId: number;
  senderName: string;
  productId: number;
  itemId: number;
  itemType: string;
  startTime: number;
  endTime: number;
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
}

export interface CursorPageResponse<T> {
  content: T[];
  nextCursorId?: number;
  hasNext?: boolean;
  size?: number;
}
