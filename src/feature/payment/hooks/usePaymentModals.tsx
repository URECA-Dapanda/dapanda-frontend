import {
  PaymentConfirmModal,
  PaymentModal,
  PaymentCompleteModal,
} from "@feature/payment/components";
import { usePaymentStore } from "@feature/payment/stores/paymentStore";
import { postDefaultTrade, postWifiTrade } from "@feature/payment/api/paymentRequest";
import { postScrapTrade } from "@feature/payment/api/paymentRequest";
import { useRouter } from "next/navigation";
import { showErrorToast } from "@lib/toast";
import { throttle } from "lodash";
import { useMutation } from "@tanstack/react-query";

export default function UsePaymentModals() {
  const router = useRouter();
  const { step, info, setStep, reset } = usePaymentStore();
  const { mutateAsync: defaultMutation, isPending: defaultPending } = useMutation({
    mutationFn: postDefaultTrade,
    mutationKey: ["/api/trades/mobile-data/default"],
  });
  const { mutateAsync: scrapMutation, isPending: scrapPending } = useMutation({
    mutationFn: postScrapTrade,
    mutationKey: ["/api/trades/mobile-data/scrap"],
  });
  const { mutateAsync: wifiMutation, isPending: wifiPending } = useMutation({
    mutationFn: postWifiTrade,
    mutationKey: ["/api/trades/mobile-data/default"],
  });
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
          startTime: info.startTime,
          endTime: info.endTime,
        }}
      />

      <PaymentModal
        isOpen={step === "pay"}
        onClose={reset}
        isPending={defaultPending || scrapPending || wifiPending}
        onPay={async () => {
          try {
            if (info.type === "data") {
              if (info.badge === "일반 구매") {
                // 일반 전체 구매 (분할 불가)
                if (info.productId && info.mobileDataId) {
                  const throttledPostDefaultTrade = throttle(
                    async () =>
                      await defaultMutation({
                        productId: info.productId!,
                        mobileDataId: info.mobileDataId!,
                      }),
                    500
                  );
                  const tradeId = throttledPostDefaultTrade();
                  console.log("일반 구매 완료", tradeId);
                } else {
                  throw new Error("상품 정보가 누락되었습니다.");
                }
              } else if (info.badge === "분할 구매") {
                console.log(info);
                // 분할 구매 (분할 가능 상품 일부 구매)
                if (info.productId && info.mobileDataId && info.dataAmount) {
                  const throttledPostDefaultTrade = throttle(
                    async () =>
                      await defaultMutation({
                        productId: info.productId!,
                        mobileDataId: info.mobileDataId!,
                        dataAmount: info.dataAmount,
                      }),
                    500
                  );
                  const tradeId = await throttledPostDefaultTrade();
                  console.log("분할 구매 완료", tradeId);
                } else {
                  throw new Error("분할 구매 정보가 누락되었습니다.");
                }
              } else if (info.badge === "자투리 구매") {
                // 자투리 조합 구매
                if (info.totalAmount && info.totalPrice && info.combinations) {
                  const throttledPostScrapTrade = throttle(
                    async () =>
                      await scrapMutation({
                        totalAmount: info.totalAmount!,
                        totalPrice: info.totalPrice!,
                        combinations: info.combinations!,
                      }),
                    500
                  );
                  const tradeId = await throttledPostScrapTrade();
                  console.log("자투리 구매 완료", tradeId);
                } else {
                  throw new Error("자투리 구매 정보가 누락되었습니다.");
                }
              }
            } else if (info.type === "wifi") {
              // 와이파이 구매
              if (info.productId && info.wifiId && info.startTime && info.endTime) {
                const throttledPostWifiTrade = throttle(
                  async () =>
                    await wifiMutation({
                      productId: info.productId!,
                      wifiId: info.wifiId!,
                      startTime: info.startTime!,
                      endTime: info.endTime!,
                    }),
                  500
                );
                const tradeId = await throttledPostWifiTrade();
                console.log("와이파이 구매 완료", tradeId);
              } else {
                throw new Error("구매 정보가 누락되었습니다.");
              }
            }
            setStep("complete");
          } catch (e: unknown) {
            if (e && typeof e === "object" && "response" in e) {
              const error = e as {
                response?: {
                  data?: {
                    code?: number;
                    message?: string;
                  };
                };
              };
              const code = error.response?.data?.code;

              if (code === 4004) {
                showErrorToast("보유 캐시가 부족합니다. 캐시를 충전해주세요!");
                setTimeout(() => {
                  router.push("/mypage/charge");
                }, 1500);
              } else {
                showErrorToast(
                  "결제 실패: " + (error.response?.data?.message ?? "알 수 없는 에러")
                );
              }
            } else {
              showErrorToast("결제 실패: " + (e as Error).message);
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
          startTime: info.startTime,
          endTime: info.endTime,
          location: info.location,
        }}
      />
    </>
  );
}
