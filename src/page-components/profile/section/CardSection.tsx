import { Card, CardContent } from "@/components/ui/card";
import RechargeCashButton from "./RechargeCashButton";

export default function CardSection() {
  return (
    <Card className="bg-gradient-to-r from-[#119c72] to-[#0d7a5a] text-white">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm opacity-90">보유 캐시</div>
            <div className="text-2xl font-bold">12,500원</div>
          </div>
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-lg font-bold">₩</span>
          </div>
        </div>
        <RechargeCashButton />
      </CardContent>
    </Card>
  );
}
