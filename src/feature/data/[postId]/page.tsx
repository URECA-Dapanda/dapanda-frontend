import DataDetailContent from "@feature/data/components/DataDetailContent";

export default function Page({ params }: { params: { postId: string } }) {
  return <DataDetailContent postId={params.postId} />;
}
