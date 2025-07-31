import { getToken, getMessaging } from "firebase/messaging";
import { app } from "@/lib/firebase";
import { postFcmToken } from "@feature/notification/api/requestNotification";

export const requestFcmToken = async () => {
  // SSR 환경에서는 실행 방지
  if (typeof window === "undefined" || !("Notification" in window)) return;

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return;

  try {
    const messaging = getMessaging(app);
    const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");

    const newToken = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!,
      serviceWorkerRegistration: registration,
    });

    if (!newToken) return;

    const savedToken = localStorage.getItem("fcmToken");

    if (newToken !== savedToken) {
      await postFcmToken(newToken);
      localStorage.setItem("fcmToken", newToken);
    }

    console.log("FCM 토큰 처리 완료:", newToken);
  } catch (error) {
    console.error("FCM 토큰 요청 실패:", error);
  }
};
