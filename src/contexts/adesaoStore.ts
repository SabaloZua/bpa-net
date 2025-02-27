import { create } from "zustand";

interface AdesaoStore {
  email: string;
  setEmail: (email: string) => void;
}

export const useAdesaoStore = create<AdesaoStore>((set) => ({
  email: "",
  setEmail: (email) => set({ email }),
}));
