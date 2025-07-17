import DataDetailContent from "@/feature/data/components/DataDetailContent";

export default async function Page({ params }: { params: Promise<{ postId: string }> }) {
  const resolvedParams = await params; // 비동기적으로 params를 처리
  return <DataDetailContent postId={resolvedParams.postId} />;
}
