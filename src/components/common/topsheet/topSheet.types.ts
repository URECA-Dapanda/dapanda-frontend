export interface PostData {
  imageUrl: string;
  uploadTime: string;
  title: string;
  price: number;
  unitPrice: number;
  recentPrice?: number;
  averagePrice?: number;
  hasReported?: boolean;
  memberName: string;
  splitType?: boolean;
  isOwner?: boolean;
}

export interface WifiData {
  open: boolean;
  imageUrl: string[];
  place: string;
  address: string;
  startTime: string;
  endTime: string;
  pricePer10min: number;
  description?: string;
  recentPrice?: number;
  averagePrice?: number;
  memberName: string;
  isOwner?: boolean;
}

export type CommonTopSheetProps = {
  onImageClick: () => void;
};

export type TopSheetProps =
  | (CommonTopSheetProps & { type: "post"; data: PostData & { isOwner?: boolean }})
  | (CommonTopSheetProps & { type: "wifi"; data: WifiData });
