import axios from "@/lib/axios";

/**
 * FCM 토큰을 서버에 저장합니다.
 * @param token - Firebase에서 발급받은 FCM token
 */
export const postFcmToken = async (token: string) => {
  try {
    const res = await axios.post("/api/fcm/save", { token });
    return res.data;
  } catch (err) {
    console.debug("FCM 토큰 저장 실패:", err);
    throw err;
  }
};
