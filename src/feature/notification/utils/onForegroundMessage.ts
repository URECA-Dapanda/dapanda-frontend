import { onMessage, getMessaging } from "firebase/messaging";
import { app } from "@/lib/firebase";

export const onForegroundMessage = () => {
  if (typeof window === "undefined") return;

  const messaging = getMessaging(app);
  onMessage(messaging, (payload) => {
    console.log("Foreground message received:", payload);

    if (Notification.permission === "granted") {
      new Notification(payload.notification?.title ?? "DaPanDa", {
        body: payload.notification?.body ?? "",
        icon: "/dpd-main-logo.png",
      });
    }
  });
};
