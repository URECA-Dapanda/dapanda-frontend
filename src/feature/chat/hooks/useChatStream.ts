// "use client";

// import { useEffect, useState, useRef } from "react";
// import type { ChatMessage } from "@/feature/chat/types/message";

// export function useChatStream(chatId: string, currentUserId: string) {
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const pollingRef = useRef<NodeJS.Timeout | null>(null);

//   const fetchMessages = async () => {
//     try {
//       const res = await fetch(`/api/chat/${chatId}`);
//       if (!res.ok) return;
//       const data: ChatMessage[] = await res.json();
//       setMessages(data);
//     } catch (error) {
//       console.error("채팅 불러오기 오류:", error);
//     }
//   };

//   useEffect(() => {
//     fetchMessages();
//     pollingRef.current = setInterval(fetchMessages, 3000);

//     return () => {
//       if (pollingRef.current) clearInterval(pollingRef.current);
//     };
//   }, [chatId]);

//   const sendMessage = async (text: string) => {
//     try {
//       await fetch("/api/chat/send", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ chatId, text }),
//       });
//     } catch (error) {
//       console.error("메시지 전송 실패:", error);
//     }
//   };

//   return { messages, sendMessage };
// }
