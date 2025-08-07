import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center gap-48 h-main-safe pb-safe-bottom pt-safe-top">
      <Image src={"/notfoundpanda.png"} width={375} height={0} alt="Not Found" />
      <Link href={"/"} className="text-primary font-bold body-md">
        이전으로 돌아가기
      </Link>
    </div>
  );
}
