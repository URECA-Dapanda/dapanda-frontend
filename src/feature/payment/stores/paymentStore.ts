import { create } from "zustand";
import { PaymentStep, PaymentInfo } from "@feature/payment/types/paymentTypes";

interface PaymentState {
  step: PaymentStep;
  info: PaymentInfo | null;
  setInfo: (info: PaymentInfo) => void;
  setStep: (step: PaymentStep) => void;
  reset: () => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  step: null,
  info: null,
  setInfo: (info) => set({ info, step: "confirm" }),
  setStep: (step) => set({ step }),
  reset: () => set({ step: null, info: null }),
}));
