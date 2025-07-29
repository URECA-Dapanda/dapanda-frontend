import { Suspense } from "react";
import DataPageContent from "@feature/data/components/pages/DataPageContent";

export default function DataPage() {
  return (
    <Suspense>
      <DataPageContent />
    </Suspense>
  );
}
