export type NaverMap = naver.maps.Map;

export type Lng = number;
export type Lat = number;
export type Coordinates = [Lng, Lat];

declare global {
  namespace naver.maps {
    interface MarkerClusteringOptions {
      map: naver.maps.Map;
      markers?: naver.maps.Marker[];
      gridSize?: number;
      minClusterSize?: number;
      maxZoom?: number;
      disableClickZoom?: boolean;
      icons?: {
        content: string;
        size: naver.maps.Size;
        anchor: naver.maps.Point;
      }[];
    }

    class MarkerClustering {
      constructor(options: MarkerClusteringOptions);

      getMarkers(): naver.maps.Marker[];
      setMarkers(markers: naver.maps.Marker[]): void;
      clear(): void;
      setMap(map: naver.maps.Map | null): void;
    }
  }
}

export {};
