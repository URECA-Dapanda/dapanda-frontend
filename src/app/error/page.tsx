import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Error</h2>
      <p>에러가 발생했습니다.</p>
      <Link href={"/data"}>홈으로 돌아가기</Link>
    </div>
  );
}
