import {
  PaymentConfirmModal,
  PaymentModal,
  PaymentCompleteModal,
} from "@feature/payment/components";
import { usePaymentStore } from "@feature/payment/stores/paymentStore";
import { postDefaultTrade, postWifiTrade } from "@feature/payment/api/paymentRequest";
import { postScrapTrade } from "@feature/payment/api/paymentRequest";
import { toast } from "react-toastify";

export default function UsePaymentModals() {
  const { step, info, setStep, reset } = usePaymentStore();
  if (!info) return null;

  return (
    <>
      <PaymentConfirmModal
        isOpen={step === "confirm"}
        onClose={reset}
        onNext={() => setStep("pay")}
        type={info.type}
        info={{
          title: info.title,
          price: info.price,
          buyerType: info.badge,
          seller: info.seller,
          location: info.location,
          duration: info.duration,
        }}
      />

      <PaymentModal
        isOpen={step === "pay"}
        onClose={reset}
        onPay={async () => {
          try {
            if (info.type === "data") {
              if (info.badge === "일반 구매") {
                // 일반 전체 구매 (분할 불가)
                if (info.productId && info.mobileDataId) {
                  const tradeId = await postDefaultTrade(info.productId, info.mobileDataId);
                  console.log("일반 구매 완료", tradeId);
                } else {
                  throw new Error("상품 정보가 누락되었습니다.");
                }
              } else if (info.badge === "분할 구매") {
                console.log(info);
                // 분할 구매 (분할 가능 상품 일부 구매)
                if (info.productId && info.mobileDataId && info.dataAmount) {
                  const tradeId = await postDefaultTrade(
                    info.productId,
                    info.mobileDataId,
                    info.dataAmount
                  );
                  console.log("분할 구매 완료", tradeId);
                } else {
                  throw new Error("분할 구매 정보가 누락되었습니다.");
                }
              } else if (info.badge === "자투리 구매") {
                // 자투리 조합 구매
                if (info.totalAmount && info.totalPrice && info.combinations) {
                  const tradeId = await postScrapTrade(
                    info.totalAmount,
                    info.totalPrice,
                    info.combinations
                  );
                  console.log("자투리 구매 완료", tradeId);
                } else {
                  throw new Error("자투리 구매 정보가 누락되었습니다.");
                }
              }
            } else if (info.type === "wifi") {
              // 와이파이 구매
              if (info.productId && info.wifiId && info.startTime && info.endTime) {
                const tradeId = await postWifiTrade(
                  info.productId,
                  info.wifiId,
                  info.startTime,
                  info.endTime
                );
                console.log("와이파이 구매 완료", tradeId);
              } else {
                throw new Error("구매 정보가 누락되었습니다.");
              }
            }
            setStep("complete");
          } catch (e: unknown) {
            if (e && typeof e === "object" && "response" in e) {
              const error = e as { response?: { data?: { message?: string } } };
              toast.error("결제 실패: " + (error.response?.data?.message ?? "알 수 없는 에러"));
            } else {
              toast.error("결제 실패: " + (e as Error).message);
            }
          }
        }}
        type={info.type}
        info={info}
      />
      <PaymentCompleteModal
        isOpen={step === "complete"}
        onClose={reset}
        type={info.type}
        info={{
          title: info.title,
          remainingData: info.remainingData,
        }}
      />
    </>
  );
}
