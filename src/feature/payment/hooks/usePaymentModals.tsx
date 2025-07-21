import {
    PaymentConfirmModal,
    PaymentModal,
    PaymentCompleteModal,
  } from "@feature/payment/components";
import { usePaymentStore } from "@feature/payment/stores/paymentStore";
import { postDefaultTrade } from "@feature/payment/api/paymentRequest";  
import { postScrapTrade } from "@feature/payment/api/paymentRequest";

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
                  if (info.productId && info.mobileDataId) {
                    const tradeId = await postDefaultTrade(
                      info.productId,
                      info.mobileDataId,
                      info.dataAmount // optional
                    );
                    console.log("결제 완료", tradeId);
                  } else {
                    throw new Error("상품 정보가 누락되었습니다.");
                  }
                } else if (info.badge === "자투리 구매") {
                  if (info.totalAmount && info.totalPrice && info.combinations) {
                    const tradeId = await postScrapTrade(
                      info.totalAmount,
                      info.totalPrice,
                      info.combinations
                    );
                    console.log("자투리 결제 완료", tradeId);
                  } else {
                    throw new Error("자투리 구매 정보가 누락되었습니다.");
                  }
                }
              }
              setStep("complete");
            } catch (e: any) {
              alert("결제 실패: " + (e.response?.data?.message ?? e.message ?? "알 수 없는 에러"));
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