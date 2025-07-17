import SharedHeader from "@components/common/header/SharedHeader";
import BottomNavigation from "@components/common/navigation/BottomNavigation";

export default function NavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative h-[100dvh] w-full bg-primary2">
      <SharedHeader />
      {children}
      <BottomNavigation />
    </div>
  );
}
