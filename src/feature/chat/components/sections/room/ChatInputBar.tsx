"use client";

import { useState, useRef } from "react";
import InputComponent from "@/components/common/input/InputComponent";
import { ButtonComponent } from "@/components/common/button";

interface ChatInputBarProps {
  onSend: (message: string) => void;
}

export default function ChatInputBar({ onSend }: ChatInputBarProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const MAX_HEIGHT = 120;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setMessage(e.target.value);

    if (textareaRef.current && e.target instanceof HTMLTextAreaElement) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, MAX_HEIGHT) + "px";
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white w-[100dvw] lg:w-[375px] mx-auto safe-area-bottom">
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
          className="flex-1 border border-primary-700 bg-primary-50 py-8 text-gray-700 body-sm overflow-y-auto min-h-[36px] max-h-[120px] resize-none"
        />
        <ButtonComponent
          size="xl"
          onClick={handleSend}
          className="bg-primary text-white font-semibold body-md w-52"
        >
          전송
        </ButtonComponent>
      </div>
    </div>
  );
}
