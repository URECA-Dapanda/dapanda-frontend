import { Button } from "@/components/ui/button";
import CardSection from "./section/CardSection";
import MenuList from "./section/MenuList";
import ProfileSection from "./section/ProfileSection";

export default function ProfileContent() {
  return (
    <div className="w-[375px] h-[812px] mx-auto bg-[#fefaef] overflow-hidden">
      <div
        className="p-4 space-y-6 pb-20 overflow-y-auto"
        style={{ height: "calc(812px - 120px)" }}
      >
        {/* Profile Section */}
        <ProfileSection />

        {/* Cash Section */}
        <CardSection />

        {/* Menu Items - 간소화 */}
        <MenuList />

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
        >
          로그아웃
        </Button>
      </div>
    </div>
  );
}
