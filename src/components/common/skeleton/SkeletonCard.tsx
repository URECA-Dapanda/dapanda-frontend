import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex items-center gap-32 h-full p-8">
      <Skeleton className="h-10 w-10 rounded-full" />

      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-152" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-120" />
          <Skeleton className="h-3 w-144" />
        </div>
      </div>

      <div className="flex flex-col items-end text-right self-start space-y-8 ml-auto">
        <Skeleton className="h-12 w-20" />
        <Skeleton className="h-12 w-36" />
      </div>
    </div>
  );
}
