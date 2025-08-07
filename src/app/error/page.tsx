import Image from "next/image";
import Link from "next/link";
import { ButtonComponent } from "@components/common/button";

export default function ErrorPage() {
  return (
    <div className="h-main-safe pb-safe-bottom pt-safe-top flex flex-col items-center justify-center gap-60">
      <Image priority src={"/error-panda.png"} width={325} height={0} alt="Error 발생" />
      <p className="body-md">에러가 발생했습니다.</p>
      <Link href={"/data"}>
        <ButtonComponent variant={"outlinePrimary"}>홈으로 돌아가기</ButtonComponent>
      </Link>
    </div>
  );
}
