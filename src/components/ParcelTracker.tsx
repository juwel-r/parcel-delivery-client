"use client";

import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { Loader2, MapPin, CheckCircle, BookmarkCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useParams } from "react-router";
import { useParcelTrackingQuery } from "@/redux/features/parcel/parcelApi";
import type { IStatusLog, TParcelStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Package, Clock, CheckCircle2, XCircle } from "lucide-react";
import { format } from "date-fns";

export default function ParcelTracker() {
  const { trackingId } = useParams();
  const { data, isLoading, isError } = useParcelTrackingQuery(trackingId!);
const isMobile = window.innerWidth < 640;

  let parcel;
  if (!isLoading && !isError && data) {
    parcel = data.data;
  }
  const isCancelled = parcel?.currentStatus === "CANCELLED";

  if (isLoading)
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="animate-spin w-6 h-6 text-primary" />
        <p className="ml-2 text-sm text-muted-foreground">
          Loading parcel details...
        </p>
      </div>
    );

  if (!parcel)
    return (
      <div className="text-center py-10 text-muted-foreground">
        No tracking information found for ID:{" "}
        <span className="font-semibold">{trackingId}</span>
      </div>
    );

  const getStepNumber = (status: TParcelStatus) => {
    const order: TParcelStatus[] = [
      "REQUESTED",
      "APPROVED",
      "DISPATCHED",
      "IN_TRANSIT",
      "DELIVERED",
      "CANCELLED",
    ];
    return order.indexOf(status) + 1;
  };

  const activeStep = getStepNumber(parcel.currentStatus);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6  rounded-2xl shadow-sm space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-semibold text-primary">Parcel Tracking</h2>

      </div>

      <Card className="shadow-lg border-t-4 border-primary">
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center gap-2 text-primary">
              <Package className="w-6 h-6 text-center" />
              <span className="mb-2 text-center leading-5">Tracking ID: {parcel.trackingId}</span>
            </div>
            {isCancelled ? (
              <span className="text-red-600 font-semibold flex items-center gap-1">
                <XCircle className="w-4 h-4" /> Cancelled
              </span>
            ) : (
              <span className="text-green-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> {parcel.currentStatus}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start gap-2">
            <User className="w-4 h-4 mt-1 text-primary" />
            <div>
              <p className="font-semibold">Sender</p>
              <p>
                {typeof parcel.sender === "string"
                  ? parcel.sender
                  : parcel.sender?.name}
              </p>
              <p className="text-muted-foreground">
                {typeof parcel.sender === "string"
                  ? parcel.sender
                  : parcel.sender?.phone}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <User className="w-4 h-4 mt-1 text-primary" />
            <div>
              <p className="font-semibold">Receiver</p>
              <p>
                {typeof parcel.receiver === "string"
                  ? parcel.receiver
                  : parcel.receiver?.name}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 sm:col-span-2">
            <MapPin className="w-4 h-4 mt-1 text-primary" />
            <div>
              <p className="font-semibold">Delivery Address</p>
              <p>{parcel.deliveryAddress}</p>
            </div>
          </div>
          <div className="flex items-start gap-2 sm:col-span-2">
            <Clock className="w-4 h-4 mt-1 text-primary" />
            <div>
              <p className="font-semibold">Expected Delivery</p>
              <p>{new Date(parcel.deliveryDate).toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- Tracking Progress --- */}
      <Stepper
        defaultValue={activeStep}
        orientation={isMobile ? "vertical" : "horizontal"}
        className="px-4 w-full my-"
      >
        {(() => {
          const baseOrder: TParcelStatus[] = [
            "REQUESTED",
            "APPROVED",
            "DISPATCHED",
            "IN_TRANSIT",
            "DELIVERED",
          ];

          const order =
            parcel.currentStatus === "CANCELLED" ? ["CANCELLED"] : baseOrder;

          let lastCompletedIndex = -1;
          if (parcel.currentStatus === "CANCELLED") {
            const indices = parcel.statusLog
              .map((s) => baseOrder.indexOf(s.status as TParcelStatus))
              .filter((i) => i >= 0);
            if (indices.length) lastCompletedIndex = Math.max(...indices);
          } else {
            lastCompletedIndex = activeStep - 1;
          }

          return order.map((status, index, arr) => {
            const stepNumber = index + 1;

            if (parcel.currentStatus === "CANCELLED") {
              const isCancelledStep = status === "CANCELLED";
              const isCompleted = index <= lastCompletedIndex;
              const isCurrent = isCancelledStep;
              const isUpcoming = !isCompleted && !isCurrent;

              const stepData = parcel.statusLog.find(
                (s: IStatusLog) => s.status === status
              );

              return (
                <StepperItem
                  key={status}
                  step={stepNumber}
                  className="relative flex-1 flex-col!"
                >
                  <StepperTrigger className="flex-col gap-3 rounded">
                    <StepperIndicator
                      className={cn(
                        "border-2 transition-colors duration-300",
                        isCompleted
                          ? "bg-green-500 border-green-500 text-white"
                          : isCurrent
                          ? "bg-red-500 border-red-500 text-white ring-4 ring-red-200"
                          : "bg-gray-100 border-gray-300 text-gray-400"
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : isCurrent ? (
                        <span className="text-sm font-semibold">
                          {stepNumber}
                        </span>
                      ) : (
                        stepNumber
                      )}
                    </StepperIndicator>

                    <div className="space-y-0.5 px-2 text-center">
                      <StepperTitle
                        className={cn(
                          "font-medium text-sm transition-colors",
                          isCompleted || isCurrent
                            ? "text-foreground"
                            : "text-gray-400"
                        )}
                      >
                        {status}
                      </StepperTitle>

                      {stepData && (
                        <>
                          <StepperDescription
                            className={cn(
                              "text-xs",
                              isUpcoming
                                ? "text-gray-400"
                                : "text-muted-foreground"
                            )}
                          >
                            {new Date(stepData.timestamp).toLocaleString()}
                          </StepperDescription>
                          <div
                            className={cn(
                              "flex items-center justify-center gap-1 text-xs",
                              isUpcoming ? "text-gray-400" : "text-gray-500"
                            )}
                          >
                            <MapPin className="w-3 h-3" /> {stepData.location}
                          </div>
                        </>
                      )}
                    </div>
                  </StepperTrigger>

                  {stepNumber < arr.length && (
                    <StepperSeparator
                      className={cn(
                        "absolute inset-x-0 top-3 left-[calc(50%+0.75rem+0.125rem)] -order-1 m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none",
                        isCompleted
                          ? "bg-green-500"
                          : isCurrent
                          ? "bg-red-500"
                          : "bg-gray-300"
                      )}
                    />
                  )}
                </StepperItem>
              );
            }

            const isCompleted = index < activeStep - 1;
            const isCurrent = index === activeStep - 1;
            const isUpcoming = index > activeStep - 1;

            const stepData = parcel.statusLog.find((s:IStatusLog) => s.status === status);

            return (
              <StepperItem
                key={status}
                step={stepNumber}
                className="relative flex-1 flex-col!"
              >
                <StepperTrigger className="flex-col gap-3 rounded">
                  <StepperIndicator
                    className={cn(
                      "border-2 transition-colors duration-300",
                      isCompleted
                        ? "bg-green-500 border-green-500 text-white"
                        : isCurrent
                        ? "bg-blue-500 border-blue-500 text-white ring-4 ring-blue-200"
                        : "bg-gray-100 border-gray-300 text-gray-400"
                    )}
                  >
                    {isCompleted || isCurrent ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      stepNumber
                    )}
                  </StepperIndicator>

                  <div className="space-y-0.5 px-2 text-center">
                    <StepperTitle
                      className={cn(
                        "font-medium text-sm transition-colors",
                        isCompleted || isCurrent
                          ? "text-foreground"
                          : "text-gray-400"
                      )}
                    >
                      {status}
                    </StepperTitle>

                    {stepData && (
                      <>
                        <StepperDescription
                          className={cn(
                            "text-xs",
                            isUpcoming
                              ? "text-gray-400"
                              : "text-muted-foreground"
                          )}
                        >
                          {format(stepData.timestamp, "d/M/y hh:mm a")}
                        </StepperDescription>
                        <div
                          className={cn(
                            "flex items-start justify-center gap-1 text-xs",
                            isUpcoming ? "text-gray-400" : "text-gray-500"
                          )}
                        >
                          <MapPin className="w-3 h-3" /> {stepData.location}
                        </div>
                          {stepData.notes && <div className="flex items-start justify-start gap- text-xs text-muted-foreground"><p><BookmarkCheck size={12}/></p><p>{stepData.notes}</p></div>}
                          
                      </>
                    )}
                  </div>
                </StepperTrigger>

                {!isMobile&& stepNumber < arr.length && (
                  <StepperSeparator
                    className={cn(
                      "absolute inset-x-0 top-3 left-[calc(50%+0.75rem+0.125rem)] -order-1 m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none",
                      isCompleted
                        ? "bg-green-500"
                        : isCurrent
                        ? "bg-blue-500"
                        : "bg-gray-300"
                    )}
                  />
                )}
              </StepperItem>
            );
          });
        })()}
      </Stepper>
    </div>
  );
}
