import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Page Not Found</h2>
      <p>요청하신 페이지를 찾지 못했습니다.</p>
      <Link href={"/data"}>이전으로 돌아가기</Link>
    </div>
  );
}
