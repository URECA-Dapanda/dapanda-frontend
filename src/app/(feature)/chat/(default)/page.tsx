import { Suspense } from "react";
import ChatListPageContent from "@/feature/chat/components/pages/ChatListPageContent";
import LoadingPanda from "@components/common/empty/Loading";

export default function Page() {
  return (
    <Suspense fallback={<LoadingPanda />}>
      <ChatListPageContent />
    </Suspense>
  );
}
