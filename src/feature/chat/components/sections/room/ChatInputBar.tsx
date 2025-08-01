"use client";

import { useState, useRef } from "react";
import InputComponent from "@/components/common/input/InputComponent";
import { ButtonComponent } from "@/components/common/button";

interface ChatInputBarProps {
  onSend: (message: string) => void;
}

export default function ChatInputBar({ onSend }: ChatInputBarProps) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSendClick = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isSending) return;

    setIsSending(true);

    try {
      await onSend(trimmedMessage);
      setMessage("");
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
      }
    } catch (error) {
      console.error("메시지 전송 실패:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newValue = e.target.value;
    setMessage(newValue);

    const textarea = textareaRef.current;
    if (textarea && e.target instanceof HTMLTextAreaElement) {
      textarea.style.height = "auto";
      const scrollHeight = textarea.scrollHeight;
      const maxHeight = 120;
      textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white w-[100dvw] lg:w-[375px] mx-auto">
      <div className="flex items-end gap-16 mx-auto max-h-[120px] pb-24 px-24">
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
          className="flex-1 min-h-[36px] max-h-[120px] resize-none border-primary-700 bg-primary-50 text-gray-700 body-sm"
        />
        <ButtonComponent
          size="xl"
          onClick={handleSendClick}
          disabled={isSending || !message.trim()}
          className="bg-primary text-white font-semibold body-md w-52"
        >
          {isSending ? "전송중..." : "전송"}
        </ButtonComponent>
      </div>
    </div>
  );
}
