import {
    PaymentConfirmModal,
    PaymentModal,
    PaymentCompleteModal,
  } from "@feature/payment/components";
  import { usePaymentStore } from "@feature/payment/stores/paymentStore";
  
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
          onPay={() => setStep("complete")}
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