import { UserType } from "@/types/User";
import axios from "@/lib/axios";

/**
 * 실제 API 연동시 삭제해주세요.
 */
const mockInfo = () =>
  new Promise<Partial<UserType>>((resolve) => {
    setTimeout(() => {
      resolve({ userName: "판다유저", recommend: 3.5 });
    }, 100);
  });

export const getUserInfo = async () => {
  const response = await mockInfo();

  return response;
};

export const logOutRequest = async () => {
  const response = await axios.post(`/api/auth/logout`);

  return response;
};
