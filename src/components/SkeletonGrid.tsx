import { Skeleton } from './ui/skeleton'

export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Skeleton className="h-[125px]  rounded-xl" />
      <Skeleton className="h-[125px]  rounded-xl" />
      <Skeleton className="h-[125px]  rounded-xl" />
      <Skeleton className="h-[125px]  rounded-xl" />
    </div>
  )
}
