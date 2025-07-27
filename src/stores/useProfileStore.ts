import { UserType } from "@/types/User";
import { create } from "zustand";

interface ProfileStoreProps extends Partial<UserType> {
  id?: number;
  setUserName: (newName: string) => void;
  setRecommend: (newScore: number) => void;
  setProfile: (profile: UserType) => void;
}

/**
 * @param balance 추후 default value => undefined로 수정해야함
 * @param showAvatar 추후 default value => undefined로 수정해야 함
 */
export const useProfileStore = create<ProfileStoreProps>((set) => ({
  id: 17,
  setUserName: (newName) => {
    set({ name: newName });
  },
  setRecommend: (newScore) => {
    set({ averageRating: newScore });
  },
  setProfile: (profile) => {
    set(profile);
  },
}));
