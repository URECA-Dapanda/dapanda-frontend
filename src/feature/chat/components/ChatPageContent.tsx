import { useQuery } from "@tanstack/react-query";
import { getChatContentInfo } from "../api/chatRequest";
import ContentInfoCard from "./sections/ContentInfoCard";

export default function ChatPageContent() {
  const { data: chatInfoData } = useQuery({
    queryKey: ["chat/info"],
    queryFn: getChatContentInfo,
  });

  return chatInfoData && <ContentInfoCard data={chatInfoData} />;
}
