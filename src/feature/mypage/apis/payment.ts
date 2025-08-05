import axios from "@lib/axios";
// 결제 금액 저장 (세션에)
export const savePaymentAmount = (orderId: string, amount: number) => {
  console.log("savePaymentAmount 호출:", { orderId, amount });
  return axios.post("/api/payments/save-amount", { orderId, amount });
};

// 결제 금액 검증
export const verifyPaymentAmount = (orderId: string, amount: number) => {
  console.log("verifyPaymentAmount 호출:", { orderId, amount });
  return axios.post("/api/payments/verify-amount", { orderId, amount });
};

// 결제 승인
export const confirmPayment = (paymentKey: string, orderId: string, amount: number) => {
  console.log("confirmPayment 호출:", { paymentKey, orderId, amount });
  return axios.post("/api/payments/charge", {
    paymentKey,
    orderId,
    amount,
  });
};

// 캐시 환불
export const requestRefund = ({
  requestId,
  refundAmount,
}: {
  requestId: string;
  refundAmount: number;
}) => {
  console.log("requestRefund 호출:", { requestId, refundAmount });
  return axios.post("/api/payments/refund", {
    requestId,
    refundAmount,
  });
};
