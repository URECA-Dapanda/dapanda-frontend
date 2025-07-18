import { SearchX } from "lucide-react";

export default function ScrapEmptyState({
  message = "아쉽지만, 원하는 조합을 찾지 못했어요.",
}) {
  return (
        <div className="flex flex-col items-center justify-center text-center mt-32">
            <SearchX className="w-64 h-64 mb-16" />
            <p className="body-md">{message}</p>
            <p className="body-sm text-gray-600 mt-12">
                조건을 다시 설정해 보시겠어요?
            </p>
        </div>
    );
}