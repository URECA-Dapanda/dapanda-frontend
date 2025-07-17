import DataDetailContent from "@feature/data/components/DataDetailContent";

interface PageProps {
  params: {
    postId: string;
  };
}

export default function Page({ params }: PageProps) {
  return <DataDetailContent postId={params.postId} />;
}
