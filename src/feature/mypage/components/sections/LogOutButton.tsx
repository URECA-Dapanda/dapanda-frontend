import { ButtonComponent } from "@components/common/button";
import { useAuth } from "@hooks/useAuth";
import { useWebSocketConnection } from "@/hooks/useWebSocketConnection";

export default function LogOutButton() {
  const { logout } = useAuth();
  const { disconnectOnLogout } = useWebSocketConnection();

  const handleLogout = async () => {
    disconnectOnLogout();
    await logout();
  };

  return (
    <ButtonComponent variant={"outlinePrimary"} className="w-full" onClick={handleLogout}>
      로그아웃
    </ButtonComponent>
  );
}
