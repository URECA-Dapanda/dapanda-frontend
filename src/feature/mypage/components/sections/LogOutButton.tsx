import { ButtonComponent } from "@components/common/button";
import { useAuth } from "@hooks/useAuth";

export default function LogOutButton() {
  const { logout } = useAuth();
  return (
    <ButtonComponent variant={"outlinePrimary"} className="w-full" onClick={logout}>
      로그아웃
    </ButtonComponent>
  );
}
