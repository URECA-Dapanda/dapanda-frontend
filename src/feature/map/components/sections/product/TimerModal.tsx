"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useTimerStore } from "@/stores/useTimerStore";
import { X } from "lucide-react";

export default function TimerModal() {
  const { openModal, setOpenModal, remainingTime, hasEnded } = useTimerStore();

  const minutes = String(Math.floor(remainingTime / 60)).padStart(2, "0");
  const seconds = String(remainingTime % 60).padStart(2, "0");
  const percentage = (remainingTime / 600) * 100;
  if (hasEnded || !openModal) return null;

  return (
    <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed left-0 right-0 top-0 bottom-[56px] bg-black-60 z-[9998]" />

        <Dialog.Content
          className="fixed z-[9999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
  bg-white rounded-2xl shadow-default w-[327px] h-[327px] p-24 flex flex-col justify-between"
        >
          <Dialog.Title className="sr-only">타이머 모달</Dialog.Title>
          <Dialog.Description className="sr-only">
            남은 이용시간을 확인할 수 있습니다.
          </Dialog.Description>
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold">
              {new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
            </div>
            <Dialog.Close asChild>
              <button className="text-gray-500 hover:text-black">
                <X className="w-20 h-20" />
              </button>
            </Dialog.Close>
          </div>

          {/* 가운데: 타이머를 flex center로 배치 */}
          <div className="flex flex-1 items-center justify-center">
            <div className="relative w-[160px] h-[160px]">
              <svg className="absolute top-0 left-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" stroke="#FDEDF6" strokeWidth="3.5" />
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
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
