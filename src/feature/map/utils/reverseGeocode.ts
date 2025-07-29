export type AddressResult = {
  roadAddress?: string;
  jibunAddress?: string;
  postalCode?: string;
};

export async function getAddressVariantsFromLatLng(
  lat: number,
  lng: number
): Promise<AddressResult | null> {
  return new Promise((resolve) => {
    const latlng = new naver.maps.LatLng(lat, lng);

    naver.maps.Service.reverseGeocode(
      {
        coords: latlng,
        orders: [naver.maps.Service.OrderType.ROAD_ADDR, naver.maps.Service.OrderType.ADDR].join(
          ","
        ),
      },
      (status, response) => {
        if (status !== naver.maps.Service.Status.OK || !response?.v2?.results?.length) {
          resolve(null);
          return;
        }

        const result: AddressResult = {};

        for (const item of response.v2.results) {
          const region = item.region;
          const land = item.land;

          const address =
            `${region.area1.name} ${region.area2.name} ${region.area3.name} ${
              region.area4.name || ""
            } ` +
            `${land.number1 || ""}${land.number2 ? "-" + land.number2 : ""} ` +
            `${land.addition0?.value || ""}`.trim();

          if (item.name === "roadaddr") {
            result.roadAddress = address;
            // 도로명 주소에서 우편번호 추출 (land.addition0에 우편번호가 있는 경우가 많음)
            result.postalCode = land.addition0?.value || "";
          } else if (item.name === "addr") {
            result.jibunAddress = address;
            // 지번 주소에서도 우편번호 확인 (roadaddr에서 못 가져온 경우 대비)
            if (!result.postalCode) {
              result.postalCode = land.addition0?.value || "";
            }
          }
        }

        // addition0 외에 다른 필드에서 우편번호 찾기
        if (!result.postalCode) {
          for (const item of response.v2.results) {
            const land = item.land;
            // addition1, addition2 등에서도 우편번호 확인
            const additions = [land.addition1, land.addition2, land.addition3, land.addition4];

            for (const addition of additions) {
              if (addition?.value && /^\d{5}$/.test(addition.value)) {
                result.postalCode = addition.value;
                break;
              }
            }

            if (result.postalCode) break;
          }
        }

        resolve(result);
      }
    );
  });
}
