export interface ClusterMarker {
  getElement: () => HTMLElement;
}

export interface MarkerClusteringOptions {
  map: naver.maps.Map | null;
  markers: naver.maps.Marker[];
  disableClickZoom?: boolean;
  minClusterSize?: number;
  maxZoom?: number;
  gridSize?: number;
  icons?: {
    content: string;
    size: naver.maps.Size;
    anchor: naver.maps.Point;
  }[];
  indexGenerator?: number[] | ((count: number) => number);
  averageCenter?: boolean;
  stylingFunction?: (clusterMarker: ClusterMarker, count: number) => void;
}

export interface MarkerClusteringInstance {
  setMap(map: naver.maps.Map | null): void;
  getMap(): naver.maps.Map | null;
  setOptions(options: Partial<MarkerClusteringOptions>): void;
  getOptions(key?: string): unknown; // ← 더 유연하게
}

export interface MarkerClusteringConstructor {
  new (options: MarkerClusteringOptions): MarkerClusteringInstance;
}

declare global {
  interface Window {
    MarkerClustering: MarkerClusteringConstructor;
  }
}

export {};
