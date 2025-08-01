import RegisterForm from "@feature/map/components/sections/regist/RegisterForm";

export default function WifiRegisterPage() {
  return (
    <div className="px-24 pt-safe-top pb-safe-bottom overflow-y-scroll h-main-safe">
      <RegisterForm type="wifi" />
    </div>
  );
}
