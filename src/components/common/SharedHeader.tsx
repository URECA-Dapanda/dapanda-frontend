import { Wifi } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface SharedHeaderProps {
  title: string;
  showCash: boolean;
  showAvatar: boolean;
}

export default function SharedHeader({
  title = "DaPanDa",
  showCash = true,
  showAvatar = true,
}: Partial<SharedHeaderProps>) {
  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center primary-gradient">
            <Wifi className="w-4 h-4 text-black" />
          </div>
          <h1 className="text-lg font-bold text-gray-900">{title}</h1>
        </div>
        {(showCash || showAvatar) && (
          <div className="flex items-center gap-3">
            {showCash && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full secondary-gradient bg-[rgba(63,200,151,1)]">
                <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">₩</span>
                </div>
                <span className="text-sm font-medium text-white">12,500</span>
              </div>
            )}
            {showAvatar && (
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="primary-gradient text-black">
                  🐼
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
