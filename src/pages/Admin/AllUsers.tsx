import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import PaginationCompo from "@/components/PaginationCompo";
import { UserLoadingSkeleton } from "@/components/Skeleton/UserLoadingSkeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  const [limit, setLimit] = useState("10");
  const [page, setPage] = useState(1);
  const { data: userInfo, isLoading: isLoadingUser } = useGetAllUsersQuery({limit, page});
  const [updateStatus, { isLoading: isLoadingUpdate }] =
    useUpdateStatusMutation();
  const [loading, setLoading] = useState("");

  const handleUpdateStatus = async (status: TIsActive, userId: string) => {
    setLoading(userId);
    try {
      await updateStatus({ status, userId }).unwrap();
      toast.success(`User status is now "${status}".`);
    } catch (error: any) {
      console.log(error);
      toast.error(getErrorMessage(error));
    } finally {
      setLoading("");
    }
  };
  const totalPages: number = userInfo?.meta?.totalPage ?? 0;
  const currentPage: number = userInfo?.meta?.page ?? 1;
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Users</CardTitle>
        <CardDescription>
          Manage all registered users — view details, status, and perform
          block/unblock actions.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                                className="flex items-center justify-center gap-1 disabled:bg-gray-500 disabled:cursor-not-allowed bg-primary px-2 py-1 rounded-sm text-white  w-[66px]"
                              >
                                Unblock {loading === user._id && <Spinner />}
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
                                className="flex items-center justify-center gap-1 disabled:bg-gray-500 disabled:cursor-not-allowed bg-primary px-2 py-1 rounded-sm text-white  w-[66px]"
                              >
                                Block {loading === user._id && <Spinner />}
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
      
        </div>
      </CardContent>
      <CardFooter className="overflow-auto">
        <PaginationCompo
          currentPage={currentPage}
          totalPages={totalPages}
          setLimit={setLimit}
          setPage={setPage}
        />
      </CardFooter>
    </Card>
  );
}
