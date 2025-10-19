import { Skeleton } from "@/components/ui/skeleton"

export function ParcelCardSkeleton() {
  return (
    <div className="p-4 m-4 rounded-xl border border-neutral-700 bg-neutral-900 flex justify-between items-center space-x-4 animate-in fade-in-50">
      {/* Left side - Icon and info */}
      <div className="flex space-x-3 w-full">
        {/* Icon */}
        <Skeleton className="h-12 w-12 rounded-md" />

        {/* Text info */}
        <div className="flex flex-col space-y-4 w-full">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-16 rounded-md" /> {/* Status badge */}
          </div>

          <Skeleton className="h-4 w-40" /> {/* Delivery Fee */}
          {/* <Skeleton className="h-4 w-48" /> Receiver */}
          <Skeleton className="h-4 w-60" /> {/* Address */}
        </div>
      </div>

      {/* Right side - Buttons */}
      <div className="flex space-x-2">
        <Skeleton className="h-10 w-24 rounded-lg" /> {/* Status Log */}
        <Skeleton className="h-10 w-20 rounded-lg" /> {/* Cancel */}
      </div>
    </div>
  )
}
