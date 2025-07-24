import { Suspense } from "react";
import ChatRoomPageContent from "@/feature/chat/components/pages/ChatRoomPageContent";

export default function Page() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <ChatRoomPageContent />
    </Suspense>
  );
}
