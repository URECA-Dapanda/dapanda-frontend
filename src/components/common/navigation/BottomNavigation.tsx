import { MapPin, MessageCircle, User, Wifi } from "lucide-react";
import { Fragment } from "react";
import NavigationButton from "./NavigationButton";

export default function BottomNavigation() {
  return (
    <div
      className="fixed bottom-0 z-50 bg-white border-none overflow-x-clip"
      style={{ width: "375px" }}
    >
      <div className="grid grid-cols-4 px-8 shadow-nav">
        <NavigationButton target={"/data"}>
          <Fragment>
            <Wifi className="w-20 h-20 mb-4" />
            <span className="body-xs font-medium">데이터</span>
          </Fragment>
        </NavigationButton>
        <NavigationButton target={"/map"}>
          <Fragment>
            <MapPin className="w-5 h-5 mb-1" />
            <span className="body-xs">위치기반</span>
          </Fragment>
        </NavigationButton>
        <NavigationButton target={"/chat"}>
          <MessageCircle className="w-5 h-5 mb-1" />
          <span className="body-xs">채팅</span>
        </NavigationButton>
        <NavigationButton target={"/mypage"}>
          <Fragment>
            <User className="w-5 h-5 mb-1" />
            <span className="body-xs">마이</span>
          </Fragment>
        </NavigationButton>
      </div>
    </div>
  );
}
