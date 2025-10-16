"use client"

import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper"
import { Loader2, MapPin, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useParams } from "react-router"
import { useParcelTrackingQuery } from "@/redux/features/parcel/parcelApi"

export type TParcelStatus =
  | "REQUESTED"
  | "APPROVED"
  | "DISPATCHED"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "CANCELLED"

export interface IStatusLog {
  status: TParcelStatus
  location?: string
  updatedBy?: string
  timestamp: string
}

export default function ParcelTracker() {
  const { trackingId } = useParams()
  const { data, isLoading } = useParcelTrackingQuery({ trackingId: trackingId as string })

  const parcel = data?.data

  const steps: IStatusLog[] = parcel?.statusLog || []

  if (isLoading)
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="animate-spin w-6 h-6 text-primary" />
        <p className="ml-2 text-sm text-muted-foreground">Loading parcel details...</p>
      </div>
    )

  if (!parcel)
    return (
      <div className="text-center py-10 text-muted-foreground">
        No tracking information found for ID: <span className="font-semibold">{trackingId}</span>
      </div>
    )

  const getStepNumber = (status: TParcelStatus) => {
    const order: TParcelStatus[] = [
      "REQUESTED",
      "APPROVED",
      "DISPATCHED",
      "IN_TRANSIT",
      "DELIVERED",
      "CANCELLED",
    ]
    return order.indexOf(status) + 1
  }

  const activeStep = getStepNumber(parcel.currentStatus)

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-sm border space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-semibold text-primary">Parcel Tracking</h2>
        <p className="text-sm text-muted-foreground">
          Tracking ID: <span className="font-medium">{parcel.trackingId}</span>
        </p>
      </div>

      <Stepper defaultValue={activeStep} orientation="horizontal" className="px-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber <= activeStep
          return (
            <StepperItem key={index} step={stepNumber} className="relative flex-1 flex-col!">
              <StepperTrigger className="flex-col gap-3 rounded">
                <StepperIndicator
                  className={cn(
                    "border-2",
                    isActive
                      ? "bg-green-500 border-green-500 text-white"
                      : "bg-muted border-gray-300 text-gray-400"
                  )}
                >
                  {isActive ? <CheckCircle className="w-4 h-4" /> : stepNumber}
                </StepperIndicator>

                <div className="space-y-0.5 px-2">
                  <StepperTitle className="font-medium">{step.status}</StepperTitle>
                  <StepperDescription className="text-xs text-muted-foreground">
                    {new Date(step.timestamp).toLocaleString()}
                  </StepperDescription>
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" /> {step.location}
                  </div>
                </div>
              </StepperTrigger>

              {stepNumber < steps.length && (
                <StepperSeparator className="absolute inset-x-0 top-3 left-[calc(50%+0.75rem+0.125rem)] -order-1 m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
              )}
            </StepperItem>
          )
        })}
      </Stepper>

      <div className="text-center text-sm text-muted-foreground">
        Current Status:{" "}
        <span className="font-semibold text-primary">{parcel.currentStatus}</span> <br />
        Expected Delivery:{" "}
        <span className="font-medium">
          {new Date(parcel.deliveryDate).toLocaleDateString()}
        </span>
      </div>
    </div>
  )
}
