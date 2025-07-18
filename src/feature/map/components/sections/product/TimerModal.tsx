"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useTimerStore } from "@/stores/useTimerStore";

export default function TimerModal() {
  const { openModal, setOpenModal, remainingTime } = useTimerStore();

  const minutes = String(Math.floor(remainingTime / 60)).padStart(2, "0");
  const seconds = String(remainingTime % 60).padStart(2, "0");
  const percentage = (remainingTime / 600) * 100;

  return (
    <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-lg p-6 w-[300px]">
          <div className="text-lg font-bold mb-6 text-center">
            {new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
          </div>

          <div className="relative w-[160px] h-[160px] mx-auto mb-6">
            <svg className="absolute top-0 left-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" stroke="#f3f3f3" strokeWidth="3.5" />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#e6007e"
                strokeWidth="3.5"
                strokeDasharray="100"
                strokeDashoffset={100 - percentage}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-primary text-2xl font-semibold">
              {minutes}:{seconds}
            </div>
          </div>

          <div className="text-center text-black font-semibold">남은 이용시간</div>

          <Dialog.Close asChild>
            <button className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl">
              ×
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
