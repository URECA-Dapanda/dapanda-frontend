"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import InputComponent from "@/components/common/input/InputComponent";
import { ButtonComponent } from "@/components/common/button";

interface ChatInputBarProps {
  onSend: (message: string) => void;
}

export default function ChatInputBar({ onSend }: ChatInputBarProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="flex items-center gap-16 mx-auto max-w-[375px] h-80 px-24 py-12">
        <button type="button">
          <Plus className="w-24 h-24 text-gray-600" />
        </button>

        <InputComponent
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요"
          radius="lg"
          required
          className="flex-1 border border-primary-700 bg-primary-50 px-12 py-8 h-36 text-gray-700 body-sm"
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
