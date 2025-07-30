import { formatToIsoDate, formatToIsoDatePlusOneDay } from "@/lib/time";
import type { MapDetailItem } from "@/feature/map/types/mapType";
import type { PaymentInfo } from "@/feature/payment/types/paymentTypes";
import { Time } from "@type/Time";

export const buildWifiPaymentInfo = (
  data: MapDetailItem,
  startTime: Time,
  endTime: Time
): PaymentInfo => {
  return {
    type: "wifi",
    title: data.place,
    price: `${data.pricePer10min.toLocaleString()}원`,
    seller: data.memberName,
    location: data.address,
    duration: `${startTime} ~ ${endTime}`,
    productId: Number(data.productId),
    wifiId: data.wifiId,
    startTime: formatToIsoDate(startTime),
    endTime: formatToIsoDatePlusOneDay(endTime),
  };
};
