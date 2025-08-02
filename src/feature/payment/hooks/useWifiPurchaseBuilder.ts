import { formatToIsoDate, formatToIsoDatePlusOneDay, getDurationMinutes } from "@/lib/time";
import type { MapDetailItem } from "@/feature/map/types/mapType";
import type { PaymentInfo } from "@/feature/payment/types/paymentTypes";
import { Time } from "@type/Time";

export const buildWifiPaymentInfo = (
  data: MapDetailItem,
  startTime: Time,
  endTime: Time
): PaymentInfo => {
  const duration = getDurationMinutes(startTime, endTime);
  const totalPrice = Math.ceil(duration / 10) * data.pricePer10min;

  return {
    type: "wifi",
    title: data.place,
    price: `${totalPrice.toLocaleString()}원`,
    seller: data.memberName,
    location: data.address,
    duration: `${startTime} ~ ${endTime}`,
    productId: Number(data.productId),
    wifiId: data.wifiId,
    startTime: formatToIsoDate(startTime),
    endTime: formatToIsoDatePlusOneDay(endTime),
  };
};
