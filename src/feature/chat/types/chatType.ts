export type ApiChatRoom = {
  chatRoomId: number;
  itemId: number;
  price: number;
  createdAt: string;
  lastMessageAt: string | null;
  senderId: number;
  senderName: string;
  productId: number;
  itemType: string;
  startTime: string | null;
  endTime: string | null;
  title: string;
};

export interface ContentInfoType {
  id: number; // chatRoomId
  itemId: number; // 상품 id (productId)
  // title, price는 여기서 제거 (상품 상세에서 받아옴)
}
export interface ChatMessage {
  id: string;
  senderId: string;
  senderName?: string;
  senderAvatar?: string;
  text: string;
  createdAt: string;
  productId: number;
}
export interface ChatSocketMessage {
  chatMessageId: number;
  senderId: number;
  message: string;
  createdAt: string;
}

export interface CursorPageResponse<T> {
  content: T[];
  nextCursorId?: number;
  hasNext?: boolean;
  size?: number;
}
