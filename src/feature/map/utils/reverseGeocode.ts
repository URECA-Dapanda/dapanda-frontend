export type AddressResult = {
  roadAddress?: string;
  jibunAddress?: string;
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
          } else if (item.name === "addr") {
            result.jibunAddress = address;
          }
        }

        resolve(result);
      }
    );
  });
}
