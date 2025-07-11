export interface MapType {
  id: number;
  type: "와이파이" | "핫스팟";
  title: string;
  address: string;
  location: string;
  isOpen: boolean;
  score: number;
  price: string;
}
