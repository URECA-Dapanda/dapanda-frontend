import { Suspense } from "react";
import ChatListPageContent from "@/feature/chat/components/pages/ChatListPageContent";

export default function Page() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <ChatListPageContent />
    </Suspense>
  );
}
