import AvatarIcon from "@/components/common/AvatarIcon";
import { Button } from "@ui/button";
import { Card, CardContent } from "@ui/card";
import ProfileInfo from "./ProfileInfo";

export default function ProfileSection() {
  return (
    <Card className="border-[#ffe8c6]">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <AvatarIcon size="large" />
          <ProfileInfo />
        </div>
        <Button
          variant="outline"
          className="w-full bg-transparent border-[#ffd964] text-[#119c72]"
        >
          프로필 수정
        </Button>
      </CardContent>
    </Card>
  );
}
