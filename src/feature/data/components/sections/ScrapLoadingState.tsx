import { Loader } from "lucide-react";
export default function ScrapLoadingState({ text = "최적의 조합을 찾는 중입니다..." }) {
    return (
      <div className="flex flex-col items-center justify-center mt-40 animate-pulse">
        <Loader className="w-40 h-40 animate-spin mb-16" />
        <p className="body-md">{text}</p>
      </div>
    );
  }
  