import { Star } from "lucide-react";
import { useState } from "react";

interface IStarProps {
  w: string;
  h: string;
  readonly: boolean;
  rate?: number;
}
export default function StarComponent({ w, h, readonly, rate }: IStarProps) {
  const [rating, setRating] = useState(rate || 0);
  return (
    <div className={`flex`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <div className={`relative ${w} ${h} cursor-pointer`} key={index}>
          <Star className={`${w} ${h} text-gray200`} />
        </div>
      ))}
    </div>
  );
}
