import { create } from "zustand";

interface UserStore {
  email: string;
  setEmail: (email: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  email: "",
  setEmail: (email) => set({ email }),
}));
