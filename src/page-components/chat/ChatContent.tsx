import ChatList from "./ChatList";

export default function ChatContent() {
  return (
    <div className="w-[375px] h-[812px] mx-auto bg-white overflow-hidden">
      <div
        className="p-4 space-y-2 pb-20 overflow-y-auto"
        style={{ height: "calc(812px - 120px)" }}
      >
        <ChatList />
      </div>
    </div>
  );
}
