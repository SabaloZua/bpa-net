import { create } from "zustand";

interface StepperState {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

export const useStepperStore = create<StepperState>((set) => ({
  currentStep: 1,
  setCurrentStep: (step) => set({ currentStep: step }),
}));
