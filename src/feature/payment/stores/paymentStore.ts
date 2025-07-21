import { create } from "zustand";
import { PaymentStep } from "@feature/payment/types/paymentStep";

interface PaymentInfo {
  type: "data" | "wifi" | "hotspot";
  title: string;
  price: string;
  unitPrice?: string;
  badge?: "일반 구매" | "분할 구매";
  seller?: string;
  cash: string;
  remainingData?: string;
  location?: string;
  duration?: string;
}

interface PaymentState {
  step: PaymentStep | null;
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
