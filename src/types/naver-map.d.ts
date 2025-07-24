export type NaverMap = naver.maps.Map;

export type Lng = number;
export type Lat = number;
export type Coordinates = [Lng, Lat];

declare global {
  interface NaverMapsService {
    searchAddressByKeyword: (
      query: string,
      callback: (
        status: naver.maps.Service.Status,
        response: {
          v2: {
            addresses: {
              x: string;
              y: string;
              roadAddress?: string;
              jibunAddress?: string;
            }[];
          };
        }
      ) => void
    ) => void;
  }
}

export {};
