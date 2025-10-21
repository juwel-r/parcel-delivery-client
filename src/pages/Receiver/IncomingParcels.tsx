import { useEffect, useId, useState } from "react";

import {
  useConfirmDeliveryMutation,
  useReceiverUpcomingParcelsQuery,
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
import { CheckCheck, History } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SearchAndFilter from "@/components/SearchAndFilter";
import PaginationCompo from "@/components/PaginationCompo";

export default function IncomingParcels() {
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
  } = useReceiverUpcomingParcelsQuery({
    limit,
    page,
    searchTerm,
    type,
    currentStatus,
    sort,
  });
  const [confirmDelivery] = useConfirmDeliveryMutation();

  console.log({ myParcels });

  const handleConfirmDelivery = async (id: string) => {
    setLoading(id);
    try {
      const res = await confirmDelivery(id).unwrap();
      console.log(res);
      toast.info("Parcel has been confirmed as Delivery.");
    } catch (error: any) {
      console.log(error);
      toast.error(getErrorMessage(error));
    } finally {
      setLoading("");
    }
  };

  useEffect(() => {
    const uniqueTypes: string[] = [
      ...new Set(myParcels?.data?.map((data) => data.type)),
    ];
    if (uniqueTypes.length > 1) {
      setTypeNames(uniqueTypes);
    }
  }, [myParcels]);

  const currentPage = myParcels?.meta?.page ?? 0;
  const totalPages = myParcels?.meta?.totalPage ?? 1;

  return (
    <>
      <Card className="w-full md:max-w-8/10 mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Incoming Parcels
          </CardTitle>
          <CardDescription className="text-center">
            All parcel of you are shown in below. You can search and filter them
            as need.
          </CardDescription>

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

        {!isLoading && !myParcels?.data?.length ? (
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
                <ParcelCardSkeleton />
                <ParcelCardSkeleton />
              </>
            ) : (
              <CardContent className="space-y-5 p-4 w-full">
                {!isLoading &&
                  myParcels?.data?.length &&
                  myParcels?.data?.map((item: IParcel) => (
                    <div
                      key={item._id}
                      className="relative flex w-full items-start gap-2 rounded-md border border-input p-4 shadow-xs outline-none has-data-[state=checked]:border-primary/50"
                    >
                      <div className="grid grid-cols-4 lg:grid-cols-12 md:gap-4 gap-2 gap-y-5 w-full">
                        <div className="col-span-3 lg:col-span-4 flex grow items-center gap-x-5">
                          {item.type === "Parcel" ? <Parcel /> : <Document />}

                          <div className="grid gap-x-2 gap-y-1 flex-1">
                            <Label htmlFor={id} className="text-md">
                              {item.type}
                              <span className="text-xs leading-[inherit] font-normal px-1 rounded-xs bg-primary/70 text-white/90">
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
                              From:{" "}
                              <strong>
                                {(item.sender as { name: string }).name}
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
                            Tracking Number :
                            <span className="font-bold">
                              {" "}
                              {item.trackingId}
                            </span>
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
                            onConfirm={() => handleConfirmDelivery(item._id)}
                            content="Confirm Delivery?"
                          >
                            <button
                              disabled={item.currentStatus !== "IN_TRANSIT"}
                              className={` ${
                                item.currentStatus !== "IN_TRANSIT" || isLoading
                                  ? "text-muted-foreground cursor-not-allowed flex items-center justify-center"
                                  : "text-green-500 flex items-center justify-center"
                              }`}
                            >
                              <Tooltip>
                                <TooltipTrigger asChild type="button">
                                  <CheckCheck size={44} strokeWidth={2.75} />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{`${
                                    item.currentStatus === "IN_TRANSIT"
                                      ? "Confirm delivery."
                                      : `This ${item.type} is now on ${item.currentStatus}. Confirm after in transit.`
                                  }`}</p>
                                </TooltipContent>
                              </Tooltip>
                              {loading === item._id && (
                                <Spinner className="size-8" />
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
