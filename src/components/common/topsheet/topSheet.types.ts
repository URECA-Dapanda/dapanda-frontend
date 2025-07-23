export interface PostData {
  imageUrl: string;
  uploadTime: string;
  title: string;
  price: number;
  unitPrice: number;
  recentPrice?: number;
  averagePrice?: number;
  hasReported?: boolean;
  splitType?: boolean;
}

export interface WifiData {
  imageUrl: string[];
  place: string;
  address: string;
  openTime: string;
  closeTime: string;
  pricePer10min: number;
  description?: string;
  recentPrice?: number;
  averagePrice?: number;
}

export type CommonTopSheetProps = {
  onImageClick: () => void;
};

export type TopSheetProps =
  | (CommonTopSheetProps & { type: "post"; data: PostData })
  | (CommonTopSheetProps & { type: "wifi"; data: WifiData });
