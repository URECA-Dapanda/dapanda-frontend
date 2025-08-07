"use client";

import { useState, useRef, useCallback } from "react";
import InputComponent from "@/components/common/input/InputComponent";
import { ButtonComponent } from "@/components/common/button";

interface ChatInputBarProps {
  onSend: (message: string) => void;
}

export default function ChatInputBar({ onSend }: ChatInputBarProps) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSendClick = useCallback(async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isSending) return;

    setIsSending(true);

    try {
      await onSend(trimmedMessage);
      setMessage("");

      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        setTimeout(() => {
          textarea.focus();
        }, 10);
        setTimeout(() => {
          textarea.focus();
        }, 50);
        setTimeout(() => {
          textarea.focus();
        }, 100);
      }
    } catch (error) {
      console.debug("메시지 전송 실패:", error);
    } finally {
      setIsSending(false);
    }
  }, [message, isSending, onSend]);

  const handleButtonClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      handleSendClick();
    },
    [handleSendClick]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        e.stopPropagation();
        const currentMessage = message.trim();
        if (currentMessage && !isSending) {
          setMessage("");
          handleSendClick();
        }
      }
    },
    [message, isSending, handleSendClick]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const newValue = e.target.value;
      setMessage(newValue);

      const textarea = textareaRef.current;
      if (textarea && e.target instanceof HTMLTextAreaElement) {
        textarea.style.height = "auto";
        const scrollHeight = textarea.scrollHeight;
        const maxHeight = 120;
        textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
      }
    },
    []
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white w-[100dvw] lg:w-[600px] mx-auto safe-area-bottom">
      <div className="flex items-end gap-3 mx-auto max-h-[120px] pb-12 px-24 pt-2">
        <InputComponent
          as="textarea"
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="메시지를 입력하세요"
          radius="lg"
          required
          rows={1}
          className="flex-1 min-h-[36px] max-h-[120px] resize-none border-primary-700 bg-primary-50 text-gray-700 body-xs py-6"
        />
        <ButtonComponent
          size="xl"
          onClick={handleButtonClick}
          disabled={isSending || !message.trim()}
          className={` body-md w-52 ${
            isSending ? "bg-gray-400 text-white opacity-60" : "bg-primary text-white"
          }`}
          type="button"
          style={{ touchAction: "manipulation" }}
        >
          {isSending ? "전송중..." : "전송"}
        </ButtonComponent>
      </div>
    </div>
  );
}
