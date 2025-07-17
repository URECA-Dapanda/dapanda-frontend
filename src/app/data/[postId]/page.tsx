import DataDetailContent from "@feature/data/components/DataDetailContent";

interface PageProps {
  params: {
    postId: string;
  };
}

export default function Page({ params }: { params: { postId: string } }) {
  return <DataDetailContent postId={params.postId} />;
}
