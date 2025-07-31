import { getToken, getMessaging } from "firebase/messaging";
import { app } from "@/lib/firebase";
import { postFcmToken } from "@feature/notification/api/requestNotification";

export const requestFcmToken = async () => {
  // SSR 방지용: window 없는 경우 return
  if (typeof window === "undefined" || !("Notification" in window)) return;

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return;

  try {
    const messaging = getMessaging(app);
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!,
      serviceWorkerRegistration: await navigator.serviceWorker.register("/firebase-messaging-sw.js"),

    });
    console.log("FCM TOKEN: ",token)
    if (token) {
      await postFcmToken(token);
    }
  } catch (error) {
    console.error("FCM 토큰 요청 실패", error);
  }
};