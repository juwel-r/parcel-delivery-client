import { Skeleton } from "@/components/ui/skeleton"

export function UserLoadingSkeleton() {
  return (
    <tr className="border-b transition-colors hover:bg-muted/50">
      {/* Name + Role */}
      <td className="p-2 align-middle whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="flex flex-col space-y-1">
            <Skeleton className="h-4 w-32 rounded" /> {/* Name */}
            <Skeleton className="h-3 w-16 rounded" /> {/* Role (SENDER) */}
          </div>
        </div>
      </td>

      {/* Email */}
      <td className="p-2 align-middle whitespace-nowrap">
        <Skeleton className="h-4 w-40 rounded" />
      </td>

      {/* Empty column */}
      <td className="p-2 align-middle whitespace-nowrap">
        <Skeleton className="h-4 w-24 rounded" />
      </td>

      {/* Status */}
      <td className="p-2 align-middle whitespace-nowrap text-red-500">
        <Skeleton className="h-4 w-16 rounded" />
      </td>

      {/* Action Button */}
      <td className="p-2 align-middle whitespace-nowrap">
        <Skeleton className="h-8 w-[66px] rounded-sm" />
      </td>
    </tr>
  )
}
