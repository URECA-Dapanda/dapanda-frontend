"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ButtonComponent } from "@components/common/button";

export default function FailedMessage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const message = searchParams.get("message");

  return (
    <div className="flex flex-col gap-12 items-center justify-center">
      <p className="body-sm w-full lg:w-[600px] text-start text-gray-400">에러 코드 : {code}</p>
      <p className="title-md w-full lg:w-[600px] text-start text-error">{message}</p>
      <Link href={"/mypage"} replace={true}>
        <ButtonComponent variant={"primary"} className="mt-24 w-full lg:w-[560px] ">
          이전으로 돌아가기
        </ButtonComponent>
      </Link>
    </div>
  );
}
