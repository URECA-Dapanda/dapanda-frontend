import { MapPin, MessageCircle, User, Wifi } from "lucide-react";
import { Fragment } from "react";
import NavigationButton from "./NavigationButton";

export default async function BottomNavigation() {
  return (
    <div
      className="fixed bottom-0 bg-white border-t shadow-lg"
      style={{ width: "375px" }}
    >
      <div className="grid grid-cols-4 px-2">
        <NavigationButton target={"/data"}>
          <Fragment>
            <Wifi className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">데이터</span>
          </Fragment>
        </NavigationButton>
        <NavigationButton target={"/location"}>
          <Fragment>
            <MapPin className="w-5 h-5 mb-1" />
            <span className="text-xs">위치기반</span>
          </Fragment>
        </NavigationButton>
        <NavigationButton target={"/chat"}>
          <MessageCircle className="w-5 h-5 mb-1" />
          <span className="text-xs">채팅</span>
        </NavigationButton>
        <NavigationButton target={"/profile"}>
          <Fragment>
            <User className="w-5 h-5 mb-1" />
            <span className="text-xs">마이</span>
          </Fragment>
        </NavigationButton>
      </div>
    </div>
  );
}
