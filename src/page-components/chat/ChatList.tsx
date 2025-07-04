"use client";
import { getChatHistory } from "@/apis/chat";
import { ChatProps } from "@/types/Chat";
import { useQuery } from "@tanstack/react-query";
import ChatItem from "./ChatItem";
import { memo } from "react";

function ChatList() {
  const { data } = useQuery<ChatProps[]>({
    queryKey: ["chat"],
    queryFn: getChatHistory,
  });

  console.log("Aaa", data);

  return data && data.map((chat) => <ChatItem key={chat.id} chat={chat} />);
}

export default memo(ChatList);
