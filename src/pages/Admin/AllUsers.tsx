import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { UserLoadingSkeleton } from "@/components/Skeleton/UserLoadingSkeleton";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetAllUsersQuery,
  useUpdateStatusMutation,
} from "@/redux/features/user/userApi";
import type { TIsActive } from "@/types";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { BadgeCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AllUsers() {
  const { data: userInfo, isLoading: isLoadingUser } = useGetAllUsersQuery();
  const [updateStatus, { isLoading: isLoadingUpdate }] = useUpdateStatusMutation();
  const [loading, setLoading]= useState("")

  const handleUpdateStatus = async (status: TIsActive, userId: string) => {
    setLoading(userId)
    try {
      await updateStatus({ status, userId }).unwrap();
      toast.success(`User status is now "${status}".`);
    } catch (error: any) {
      console.log(error);
      toast.error(getErrorMessage(error));
    }finally{
      setLoading("")
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        {isLoadingUser ? (
          <>
            <TableBody>
              <UserLoadingSkeleton />
              <UserLoadingSkeleton />
              <UserLoadingSkeleton />
              <UserLoadingSkeleton />
              <UserLoadingSkeleton />
              <UserLoadingSkeleton />
            </TableBody>
          </>
        ) : (
          <>
            <TableBody>
              {!isLoadingUser &&
                userInfo?.data.length &&
                userInfo?.data?.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <div className="flex users-center gap-3">
                        <div>
                          <div className="font-medium flex gap-1 items-center justify-between">
                            {user.name}
                            {user.isVerified && (
                              <BadgeCheck
                                size={16}
                                color="#00ffb3"
                                strokeWidth={2}
                                absoluteStrokeWidth
                              />
                            )}
                          </div>
                          <span className="mt-0.5 text-xs text-muted-foreground">
                            {user.role}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell
                      className={`${
                        user.isDeleted
                          ? "text-red-500"
                          : user.isActive === "BLOCK"
                          ? "text-red-500"
                          : user.isActive === "INACTIVE"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      {user.isDeleted ? "DELETED" : user.isActive}
                    </TableCell>
                    {user.isActive !== "ACTIVE" ? (
                      <TableCell className="text-center">
                        <DeleteConfirmation
                          onConfirm={() =>
                            handleUpdateStatus("ACTIVE", user._id)
                          }
                          content="Unblock this user?"
                        >
                          <button
                            disabled={isLoadingUpdate}
                            className="flex items-center justify-center gap-1 disabled:bg-gray-500 disabled:cursor-not-allowed bg-primary px-2 py-1 rounded-sm  w-[66px]"
                          >
                            Unblock {loading===user._id && <Spinner />}
                          </button>
                        </DeleteConfirmation>
                      </TableCell>
                    ) : (
                      <TableCell className="text-center ">
                        <DeleteConfirmation
                          onConfirm={() =>
                            handleUpdateStatus("BLOCK", user._id)
                          }
                          content="Block this user?"
                        >
                          <button
                            disabled={isLoadingUpdate}
                            className="flex items-center justify-center gap-1 disabled:bg-gray-500 disabled:cursor-not-allowed bg-primary px-2 py-1 rounded-sm  w-[66px]"
                          >
                            Block {loading===user._id && <Spinner />}
                          </button>
                        </DeleteConfirmation>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </>
        )}
      </Table>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Table with images
      </p>
    </div>
  );
}
