import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex items-center gap-32 h-full p-8">
      <Skeleton className="h-64 w-64 rounded-full shrink-0" />

      <div className="space-y-12">
        <Skeleton className="h-20 w-[100px]" />
        <Skeleton className="h-[14px] w-60" />
        <Skeleton className="h-16 w-[80px]" />
      </div>

      <div className="flex flex-col items-end text-right self-start mt-12 space-y-4 ml-auto">
        <Skeleton className="h-12 w-36" />
        <Skeleton className="h-12 w-56" />
      </div>
    </div>
  );
}
