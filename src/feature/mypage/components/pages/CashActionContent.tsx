"use client";

import { useCallback, useEffect } from "react";
import { useChargeStore } from "@feature/mypage/stores/useChargeStore";
import { useTossModalStore } from "@feature/mypage/stores/useTossModalStore";
import { useCashSuccessModalStore } from "@feature/mypage/stores/useCashSuccessModalStore";
import { requestRefund } from "@feature/mypage/apis/payment";
import { ButtonComponent } from "@components/common/button";
import CurrentCashCard from "@feature/mypage/components/sections/profile/CurrentCashCard";
import SelectCharge from "@feature/mypage/components/sections/profile/SelectCharge";
import ChargeInfoCard from "@feature/mypage/components/sections/profile/ChargeInfoCard";
import TossPaymentModal from "@feature/mypage/components/sections/toss/TossPaymentModal";
import CashSuccessModal from "@feature/mypage/components/sections/toss/CashSuccessModal";
import { v4 as uuidv4 } from "uuid";
import { showErrorToast, showSuccessToast } from "@lib/toast";

interface CashActionContentProps {
    mode: "charge" | "refund";
    buttonText?: string;
}

export default function CashActionContent({ mode, buttonText }: CashActionContentProps) {
    const chargeAmount = useChargeStore((state) => state.charge);
    const setChargeAmount = useChargeStore((state) => state.setCharge);
    const openToss = useTossModalStore((state) => state.open);
    const { isOpen, close, open } = useCashSuccessModalStore();

    useEffect(() => {
        return () => {
            setChargeAmount("");
        };
    }, [setChargeAmount]);
    
    const handleClick = useCallback(async () => {
        if (!chargeAmount || chargeAmount === "0") {
            showErrorToast(mode === "charge" ? "충전 금액을 입력해주세요." : "환불 금액을 입력해주세요.");
            return;
        }

        if (mode === "charge") {
            openToss();
        } else {
            const requestId = `refund-${uuidv4()}`;
            try {
                const res = await requestRefund(requestId, Number(chargeAmount));
                showSuccessToast(`${res.data.data.refundPrice.toLocaleString()}원 환불 완료`);
                open("refund");
                setChargeAmount("");
            } catch {
                showErrorToast("환불에 실패했습니다.");
            }
        }
    }, [chargeAmount, mode, openToss, open, setChargeAmount]);

    return (
        <>
            <div className="flex flex-col gap-12 p-24 pt-8">
                <CurrentCashCard />
                <SelectCharge title={mode === "refund" ? "환불 금액 선택" : "충전 금액 선택"} />
                <ChargeInfoCard />
                <ButtonComponent
                    variant={"primary"}
                    className="w-full mt-24"
                    onClick={handleClick}
                >
                    {buttonText ?? (mode === "charge" ? "결제하기" : "현금으로 전환하기")}
                </ButtonComponent>
            </div>

            {mode === "charge" && <TossPaymentModal />}

            {/* 완료 시 뜨는 모달 */}
            <CashSuccessModal isOpen={isOpen} onClose={close} mode={mode} />
        </>
    );
}
