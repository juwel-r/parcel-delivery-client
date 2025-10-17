import { useId } from "react";

import { useGetMyParcelQuery } from "@/redux/features/parcel/parcelApi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { UpdateStatusModal } from "@/components/modules/Sender/UpdateStatusModal";
import type { IParcel } from "@/types";
import Parcel from "@/assets/icons/Parcel";
import Document from "@/assets/icons/Document";


export default function MyParcels() {
  const id = useId();


  const { data: myParcels, isLoading } = useGetMyParcelQuery();

  console.log(myParcels);

  return (
    <>
      <Card className="w-full md:max-w-3/4 mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl">My All Parcels</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 p-4 w-full">
          {!isLoading &&
            myParcels?.data.length &&
            myParcels.data.map((item:IParcel) => (
              <div
                key={item._id}
                className="relative flex w-full items-start gap-2 rounded-md border border-input p-4 shadow-xs outline-none has-data-[state=checked]:border-primary/50"
              >
                <div className="grid grid-cols-4 lg:grid-cols-12 md:gap-4 gap-2 gap-y-5 w-full">
                  <div className="col-span-3 lg:col-span-4 flex grow items-center gap-5">

                    {item.type=== "Parcel" ? <Parcel/> : <Document/>}

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
                        To: <strong>{(item.receiver as {name: string}).name}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="col-span-4 text-muted-foreground text-sm space-y-1">
                    <p>
                      Booking Date:{format(new Date(item.createdAt), "dd/M/Y")}
                    </p>
                    <p>
                      Delivery Date:
                      {format(new Date(item.deliveryDate), "dd/M/Y")}
                    </p>
                    <p>
                      Delivery Address:
                      {item.deliveryAddress}
                    </p>
                  </div>

                  <div className="col-span-2 lg:col-span-2 my-auto">
                    <UpdateStatusModal item={item} />
                  </div>

                  <div className="col-span-2 my-auto w-full">
                    <Button
                      disabled={
                        !(
                          item.currentStatus === "REQUESTED" ||
                          item.currentStatus === "APPROVED"
                        )
                      }
                      className="bg-red-500 w-full"
                    >
                      Cancel Parcel
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </CardContent>
      </Card>
    </>
  );
}
