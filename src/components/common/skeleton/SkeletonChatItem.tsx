import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonChatItem() {
  return (
    <div className="flex justify-between items-start gap-12 p-8 rounded-8">
      <div className="flex items-center gap-12 flex-1">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-8 w-120" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-180" />
            <Skeleton className="h-3 w-152" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <Skeleton className="h-3 w-40" />
      </div>
    </div>
  );
}
