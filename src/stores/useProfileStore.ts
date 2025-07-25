import { UserType } from "@/types/User";
import { create } from "zustand";

interface ProfileStoreProps extends Partial<UserType> {
  setUserName: (newName: string) => void;
  setRecommend: (newScore: number) => void;
  setBalance: (newBalance: number) => void;
  setAvatar: (newAvatar: string) => void;
  setProfile: (profile: UserType) => void;
}

/**
 * @param balance 추후 default value => undefined로 수정해야함
 * @param showAvatar 추후 default value => undefined로 수정해야 함
 */
export const useProfileStore = create<ProfileStoreProps>((set) => ({
  id: 17,
  balance: "12,500",
  avatar: "",
  setUserName: (newName) => {
    set({ userName: newName });
  },
  setRecommend: (newScore) => {
    set({ recommend: newScore });
  },
  setBalance: (newBalance) => {
    set({ balance: newBalance.toLocaleString("ko-kr") });
  },
  setAvatar: (newAvatar) => {
    set({ avatar: newAvatar });
  },
  setProfile: (profile) => {
    set(profile);
  },
}));
