import { UserLoadingSkeleton } from "@/components/Skeleton/UserLoadingSkeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useGetAllParcelsQuery,
  useUpdateParcelStatusMutation,
} from "@/redux/features/parcel/parcelApi";
import { History } from "lucide-react";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { useState } from "react";
import { Link } from "react-router";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ParcelDetailsModal } from "@/components/modules/Admin/ParcelDetailsModal";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { Spinner } from "@/components/ui/spinner";
import { UpdateStatusModal } from "@/components/modules/Admin/UpdateStatusModal";

import PaginationCompo from "@/components/PaginationCompo";
import { SelectDemo } from "@/components/comp-195";

interface IItem {
  value: string;
  label: string;
}

const items: IItem[] = [
  {
    value: "",
    label: "Select",
  },
  {
    value: "Document",
    label: "Document",
  },
  {
    value: "Parcel",
    label: "Parcel",
  },
];

export default function AlParcels() {
  const [limit, setLimit] = useState("10");
  const [page, setPage] = useState(1);
  const { data: parcelData, isLoading: isLoadingParcels } =
    useGetAllParcelsQuery({ limit, page });
  const [updateParcel] = useUpdateParcelStatusMutation();
  const [loading, setLoading] = useState("");

  const handleUpdateStatus = async (parcelId: string) => {
    setLoading(parcelId);
    try {
      const res = await updateParcel(parcelId).unwrap();
      toast.success(res.message);
    } catch (error: any) {
      console.log(error);
      toast.error(getErrorMessage(error));
    } finally {
      setLoading("");
    }
  };

  const totalPages: number = parcelData?.meta?.totalPage ?? 0;
  const currentPage: number = parcelData?.meta?.page ?? 1;
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Parcels</CardTitle>
        <CardDescription>
          Manage all parcels — view details, status, and perform block/unblock
          actions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="hover:cursor-pointer">Type</TableHead>
                <TableHead>
                  Sender & <br />
                  Dispatched
                </TableHead>
                <TableHead>Tracking ID</TableHead>
                <TableHead className="text-center">
                  Delivery <br /> History
                </TableHead>
                <TableHead className="text-center">Details</TableHead>
                <TableHead className="text-center">
                  Update <br /> Status
                </TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>

            {isLoadingParcels ? (
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
                  {!isLoadingParcels &&
                    parcelData?.data.length &&
                    parcelData?.data?.map((parcel) => (
                      <TableRow key={parcel._id}>
                        <TableCell>
                          <div className="flex flex-col font-medium">
                            {parcel.type}
                            <span
                              className={cn(
                                "mt-0.5 text-xs text-muted-foreground w-fit px-0.5 rounded-xs",
                                { "bg-red-500 text-white": parcel.isBlock },
                                {
                                  "bg-yellow-500 text-black":
                                    parcel.currentStatus === "CANCELLED",
                                },
                                {
                                  "bg-green-500 text-black":
                                    parcel.currentStatus === "DELIVERED",
                                }
                              )}
                            >
                              {parcel.isBlock
                                ? "BLOCKED"
                                : parcel.currentStatus}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col font-medium">
                            {(parcel.sender as { name: string }).name}
                            <span className="mt-0.5 font-normal text-xs text-muted-foreground">
                              {format(parcel.createdAt, "dd/M/y h:mm a")}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{parcel.trackingId}</TableCell>
                        <TableCell>
                          <Link to={`/tracking/${parcel.trackingId}`}>
                            <History className="text-green-500 mx-auto" />
                          </Link>
                        </TableCell>
                        <TableCell className="text-center">
                          <ParcelDetailsModal
                            parcel={parcel}
                          ></ParcelDetailsModal>
                        </TableCell>
                        <TableCell className="text-center">
                          <UpdateStatusModal item={parcel} />
                        </TableCell>
                        <TableCell className="text-center">
                          <DeleteConfirmation
                            onConfirm={() => handleUpdateStatus(parcel._id)}
                            content={parcel.isBlock ? "Unblock?" : "Block?"}
                          >
                            <button
                              disabled={
                                parcel.currentStatus === "DELIVERED" ||
                                parcel.currentStatus === "CANCELLED"
                              }
                              className="min-w-[67px] bg-primary rounded-xs py-1 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                              <span className="px-2 rounded-sm flex justify-center items-center mx-auto">
                                {parcel.isBlock ? "Unblock" : "Block"}
                                {loading === parcel._id && <Spinner />}
                              </span>
                            </button>
                          </DeleteConfirmation>
                        </TableCell>
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
      </CardContent>
      <CardFooter className="overflow-auto">
        {/* Pagination section */}

        <PaginationCompo
          currentPage={currentPage}
          totalPages={totalPages}
          setLimit={setLimit}
          setPage={setPage}
        />
      </CardFooter>
      <div><SelectDemo items={items}/></div>
    </Card>
  );
}
