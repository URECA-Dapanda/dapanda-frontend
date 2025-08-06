import { useCallback } from "react";
import { useSearchParams } from "next/navigation";
import type { ChatSocketMessage } from "@/feature/chat/types/chatType";
import { isTemporaryMessage } from "@feature/chat/utils/chatUtils";

interface ProductInfo {
  productId: number;
  itemId: number;
  title: string;
  pricePer10min: number;
  memberName: string;
  memberId: number;
}

export const useMessageProcessing = (product: ProductInfo | null) => {
  const searchParams = useSearchParams();

  const addSenderIdToMessages = useCallback(
    (messages: ChatSocketMessage[], memberId: number) => {
      return messages.map((message) => {
        let senderId: number | undefined;

        if (message.isMine) {
          senderId = memberId;
        } else {
          const urlSenderId = searchParams.get("senderId");
          senderId = urlSenderId ? parseInt(urlSenderId, 10) : product?.memberId;
        }

        return {
          ...message,
          senderId: message.senderId || senderId,
        };
      });
    },
    [product?.memberId, searchParams]
  );

  const sortMessages = useCallback((messages: ChatSocketMessage[]): ChatSocketMessage[] => {
    return messages.sort((a, b) => {
      const aIsTemp = isTemporaryMessage(a);
      const bIsTemp = isTemporaryMessage(b);
      if (aIsTemp && bIsTemp) {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (!aIsTemp && !bIsTemp) {
        return Number(a.chatMessageId) - Number(b.chatMessageId);
      }
      if (aIsTemp && !bIsTemp) {
        return -1;
      }
      return 1;
    });
  }, []);

  return {
    addSenderIdToMessages,
    sortMessages,
  };
};
