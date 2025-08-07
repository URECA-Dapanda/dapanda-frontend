import { useCallback, useRef, useEffect } from "react";
import type { ChatSocketMessage } from "@/feature/chat/types/chatType";
import { markMessageAsRead } from "@/feature/chat/api/chatRoomRequest";
import { isTemporaryMessage } from "@feature/chat/utils/chatUtils";

export const useReadStatusHandler = (messages: ChatSocketMessage[]) => {
  const lastReadMessageId = useRef<number | null>(null);
  const isExiting = useRef(false);

  const resetUnreadCountOnExit = useCallback(async () => {
    if (isExiting.current) {
      return;
    }
    isExiting.current = true;

    // 현재 메시지 목록에서 최신 메시지 ID 가져오기
    const realMessages = messages.filter(
      (message: ChatSocketMessage) => !isTemporaryMessage(message)
    );
    let latestMessageId: number | null = null;

    if (realMessages.length > 0) {
      const latestMessage = realMessages[realMessages.length - 1];
      latestMessageId = Number(latestMessage.chatMessageId);
    }

    if (latestMessageId && lastReadMessageId.current !== latestMessageId) {
      try {
        await markMessageAsRead(latestMessageId);
        lastReadMessageId.current = latestMessageId;
      } catch (error) {
        console.debug("읽음 처리 실패:", latestMessageId, error);
      }
    }
  }, [messages]);

  const handleRealTimeReadStatus = useCallback(async (messageId: number) => {
    if (lastReadMessageId.current !== messageId) {
      try {
        await markMessageAsRead(messageId);
        lastReadMessageId.current = messageId;
      } catch (error) {
        console.debug("실시간 읽음 처리 실패:", messageId, error);
      }
    }
  }, []);

  const resetExitFlag = useCallback(() => {
    isExiting.current = false;
  }, []);

  useEffect(() => {
    let hasExecuted = false;

    const handleBeforeUnload = async () => {
      if (!hasExecuted) {
        hasExecuted = true;
        await resetUnreadCountOnExit();
      }
    };

    const handlePopState = async () => {
      if (!hasExecuted) {
        hasExecuted = true;
        await resetUnreadCountOnExit();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      if (!hasExecuted) {
        hasExecuted = true;
        resetUnreadCountOnExit();
      }

      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [resetUnreadCountOnExit]);

  return {
    resetUnreadCountOnExit,
    handleRealTimeReadStatus,
    resetExitFlag,
    lastReadMessageId: lastReadMessageId.current,
  };
};
