import { useEffect, useId, useState } from "react";

import {
  useCancelParcelMutation,
  useGetMyParcelQuery,
} from "@/redux/features/parcel/parcelApi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import type { IParcel } from "@/types";
import Parcel from "@/assets/icons/Parcel";
import Document from "@/assets/icons/Document";
import { Link } from "react-router";
import { toast } from "sonner";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { Spinner } from "@/components/ui/spinner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { ParcelCardSkeleton } from "@/components/Skeleton/ParcelListSkeleton";
import { History, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SearchAndFilter from "@/components/SearchAndFilter";
import PaginationCompo from "@/components/PaginationCompo";

export default function SenderParcels() {
  const id = useId();
  const [limit, setLimit] = useState("10");
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState<string | null>(null);
  const [typeNames, setTypeNames] = useState<string[]>([]);
  const [currentStatus, setCurrentStatus] = useState<string | null>(null);
  const [sort, setSort] = useState("-deliveryDate");

  const [loading, setLoading] = useState<string>("");

  const {
    data: myParcels,
    isLoading,
    isFetching,
  } = useGetMyParcelQuery({
    limit,
    page,
    searchTerm,
    type,
    currentStatus,
    sort,
  });
  const [cancelParcel] = useCancelParcelMutation();

  useEffect(() => {
    const uniqueTypes: string[] = [
      ...new Set(myParcels?.data.map((data) => data.type)),
    ];
    if (uniqueTypes.length > 1) {
      setTypeNames(uniqueTypes);
    }
  }, [myParcels]);

  const handleCancel = async (id: string) => {
    setLoading(id);
    try {
      const res = await cancelParcel(id).unwrap();
      console.log(res);
      toast.info("Parcel has been cancelled.");
    } catch (error: any) {
      console.log(error);
      toast.error(getErrorMessage(error));
    } finally {
      setLoading("");
    }
  };

  const currentPage = myParcels?.meta?.page ?? 0;
  const totalPages = myParcels?.meta?.totalPage ?? 1;
  const totalData = myParcels?.data?.length;

  console.log(myParcels);

  return (
    <>
      <Card className="w-full md:max-w-8/10 mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Sender Parcels - {totalData}{" "}
          </CardTitle>
          <CardDescription className="text-center">
            All parcel of you are shown in below. You can search and filter them
            as need.
          </CardDescription>
          {/* 🔍 Filter Bar */}
          <SearchAndFilter
            typeNames={typeNames}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            type={type}
            setType={setType}
            currentStatus={currentStatus}
            setCurrentStatus={setCurrentStatus}
            sort={sort}
            setSort={setSort}
          />
        </CardHeader>

        {!isLoading && !myParcels?.data.length ? (
          <h1 className="text-2xl text-muted-foreground text-center my-5">
            No Data to show.
          </h1>
        ) : (
          <div>
            {isLoading || isFetching ? (
              <>
                <ParcelCardSkeleton />
                <ParcelCardSkeleton />
                <ParcelCardSkeleton />
                <ParcelCardSkeleton />
              </>
            ) : (
              <CardContent className="space-y-5 p-4 w-full">
                {!isLoading &&
                  myParcels?.data.length &&
                  myParcels.data.map((item: IParcel) => (
                    <div
                      key={item._id}
                      className="relative flex w-full items-start gap-2 rounded-md border border-input p-4 shadow-xs outline-none has-data-[state=checked]:border-primary/50"
                    >
                      <div className="grid grid-cols-4 lg:grid-cols-12 md:gap-4 gap-2 gap-y-5 w-full">
                        <div className="col-span-3 lg:col-span-4 flex grow items-center gap-5">
                          {item.type === "Parcel" ? <Parcel /> : <Document />}

                          <div className="grid gap-2 flex-1">
                            <Label htmlFor={id} className="text-md">
                              {item.type}
                              <span className="text-xs leading-[inherit] font-normal text-muted-foreground bg-border px-1 rounded-xs">
                                {item.currentStatus}
                              </span>
                            </Label>
                            <p
                              id={`${id}-description`}
                              className="text-sm text-muted-foreground"
                            >
                              Delivery Fee: ৳{item.fee}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              To:{" "}
                              <strong>
                                {(item.receiver as { name: string }).name}
                              </strong>
                            </p>
                          </div>
                        </div>

                        <div className="col-span-4 text-muted-foreground text-sm space-y-1">
                          <p>
                            Booking Date:
                            {format(new Date(item.createdAt), "dd/M/y")}
                          </p>
                          <p>
                            Delivery Date:
                            {format(new Date(item.deliveryDate), "dd/M/y")}
                          </p>
                          <p>
                            Delivery Address:
                            {item.deliveryAddress}
                          </p>
                        </div>

                        <div className="col-span-2 lg:col-span-2 flex items-center justify-center">
                          <Link to={`/tracking/${item.trackingId}`}>
                            <Tooltip>
                              <TooltipTrigger type="button">
                                <div className="text-primary">
                                  <History size={44} strokeWidth={2.75} />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>View Status Logs</p>
                              </TooltipContent>
                            </Tooltip>
                          </Link>
                        </div>

                        <div className="col-span-2 flex items-center justify-center">
                          <DeleteConfirmation
                            onConfirm={() => handleCancel(item._id)}
                            content="Cancel this parcel."
                          >
                            <button
                              disabled={
                                !(
                                  item.currentStatus === "REQUESTED" ||
                                  item.currentStatus === "APPROVED"
                                ) || isLoading
                              }
                              className={` ${
                                !(
                                  item.currentStatus === "REQUESTED" ||
                                  item.currentStatus === "APPROVED"
                                ) || isLoading
                                  ? "text-muted-foreground cursor-not-allowed flex justify-center items-center"
                                  : "text-red-500 flex justify-center items-center"
                              }`}
                            >
                              <Tooltip>
                                <TooltipTrigger asChild type="button">
                                  <X size={44} strokeWidth={2.75} />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>
                                    {!(
                                      item.currentStatus === "REQUESTED" ||
                                      item.currentStatus === "APPROVED"
                                    )
                                      ? `This ${item.type} is already ${item.currentStatus}. so, you can not cancel this ${item.type}`
                                      : "Cancel this parcel."}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                              {loading === item._id && (
                                <Spinner className="size-8 text-primary" />
                              )}
                            </button>
                          </DeleteConfirmation>
                        </div>
                      </div>
                    </div>
                  ))}
              </CardContent>
            )}
          </div>
        )}

        <PaginationCompo
          currentPage={currentPage}
          totalPages={totalPages}
          setLimit={setLimit}
          setPage={setPage}
        />
      </Card>
    </>
  );
}
