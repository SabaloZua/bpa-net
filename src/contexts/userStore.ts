import { create } from "zustand";

interface UserStore {
  email: string;
  setEmail: (email: string) => void;
}

 const useUserStore = create<UserStore>((set) => ({
  email: "",
  setEmail: (email) => set({ email }),
}));

export default useUserStore;
