import { Wifi } from "lucide-react";
import HeaderTitle from "./HeaderTitle";
import HeaderCash from "./HeaderCash";
import AvatarIcon from "../AvatarIcon";

export default function SharedHeader() {
  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center primary-gradient">
            <Wifi className="w-4 h-4 text-black" />
          </div>
          <HeaderTitle />
        </div>
        <div
          className={`flex items-center gap-3 ${
            HeaderCash !== null || AvatarIcon !== null ? "" : "hidden"
          }`}
        >
          <HeaderCash />
          <AvatarIcon />
        </div>
      </div>
    </div>
  );
}
