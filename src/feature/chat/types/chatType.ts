export type ApiChatRoom = {
  chatRoomId: number;
  createdAt: string;
  lastMessageAt: string | null;
  senderId: number;
  senderName: string;
  productId: number;
  itemId: number;
  itemType: string;
  startTime: string | null;
  endTime: string | null;
};
