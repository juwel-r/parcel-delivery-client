"use client"

import React, { useEffect } from "react"
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, User, Package, Clock, CheckCircle2, XCircle } from "lucide-react"
import { motion } from "framer-motion"
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

export interface IParcel {
  _id?: string
  trackingId: string
  sender: { _id?: string; name: string; phone?: string }
  receiver: { _id?: string; name: string }
  deliveryAddress: string
  deliveryDate?: string
  currentStatus: TParcelStatus
  statusLog: IStatusLog[]
}

/**
 * Order used to render steps. CANCELLED is not part of the happy path,
 * we'll handle it separately and show red styling.
 */
const STATUS_ORDER: TParcelStatus[] = [
  "REQUESTED",
  "APPROVED",
  "DISPATCHED",
  "IN_TRANSIT",
  "DELIVERED",
]

const STATUS_LABELS: Record<TParcelStatus, string> = {
  REQUESTED: "Requested",
  APPROVED: "Approved",
  DISPATCHED: "Dispatched",
  IN_TRANSIT: "In Transit",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
}

{
    "_id": "68f05e64a5964b56700246ff",
    "trackingId": "TRK-20251016-560902",
    "sender": "68ef2b8858290e9b0eccf9ee",
    "receiver": {
        "_id": "68ef2ec358290e9b0eccfa1f",
        "name": "Emily Jenkins"
    },
    "deliveryAddress": "In enim quae dolore ",
    "type": "Parcel",
    "details": "Asperiores deserunt ",
    "weight": 73,
    "fee": 1230,
    "deliveryDate": "2025-10-16T08:54:11+06:00",
    "currentStatus": "REQUESTED",
    "statusLog": [
        {
            "status": "REQUESTED",
            "location": "Illum rerum ea erro",
            "updatedBy": "68ef2b8858290e9b0eccf9ee",
            "timestamp": "2025-10-16T02:54:28.517Z"
        }
    ],
    "isBlock": false,
    "createdAt": "2025-10-16T02:54:28.524Z",
    "updatedAt": "2025-10-16T02:54:28.524Z"
}

export default function ParcelTracker() {

  const {trackingId}=useParams()

  const {data:parcel, isLoading}= useParcelTrackingQuery({trackingId:"TRK-20251015-830419"})

  console.log(parcel);



  // Map current status -> step index in STATUS_ORDER (0-based)
  const getStepIndex = (status: TParcelStatus) => {
    const idx = STATUS_ORDER.indexOf(status)
    // If CANCELLED or unknown -> set to last completed step (or -1)
    if (idx === -1) {
      // If cancelled, try to infer from statusLog: pick highest index found in log
      if (status === "CANCELLED" && parcel.statusLog?.length) {
        const indices = parcel.statusLog
          .map((s) => STATUS_ORDER.indexOf(s.status))
          .filter((i) => i >= 0)
        return indices.length ? Math.max(...indices) : 0
      }
      // default to 0 (REQUESTED) if we can't map
      return 0
    }
    return idx
  }

  const currentIndex = getStepIndex(parcel.currentStatus)
  const stepValue = Math.max(1, currentIndex + 1) // Stepper expects 1-based values
  const isCancelled = parcel.currentStatus === "CANCELLED"

  // helper to get timestamp string for a status (or empty)
  const timestampFor = (status: TParcelStatus) => {
    const found = parcel.statusLog?.find((s) => s.status === status)
    if (!found?.timestamp) return ""
    try {
      return new Date(found.timestamp).toLocaleString()
    } catch {
      return found.timestamp
    }
  }

  return (
    <div className="container mx-auto max-w-3xl py-10 space-y-8 px-4">
      {/* Header */}
      <Card className="shadow-lg border-t-4 border-primary">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary">
              <Package className="w-6 h-6" />
              <span className="font-medium">Tracking ID: {parcel.trackingId}</span>
            </div>

            <div className="flex items-center gap-3">
              {isCancelled ? (
                <span className="text-red-600 font-semibold flex items-center gap-1">
                  <XCircle className="w-4 h-4" /> {STATUS_LABELS.CANCELLED}
                </span>
              ) : (
                <span className="text-green-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> {STATUS_LABELS[parcel.currentStatus]}
                </span>
              )}
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start gap-2">
            <User className="w-4 h-4 mt-1 text-primary" />
            <div>
              <p className="font-semibold">Sender</p>
              <p>{parcel.sender.name}</p>
              {parcel.sender.phone && <p className="text-muted-foreground">{parcel.sender.phone}</p>}
            </div>
          </div>

          <div className="flex items-start gap-2">
            <User className="w-4 h-4 mt-1 text-primary" />
            <div>
              <p className="font-semibold">Receiver</p>
              <p>{parcel.receiver.name}</p>
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
              <p>{parcel.deliveryDate ? new Date(parcel.deliveryDate).toLocaleString() : "—"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stepper */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-center text-primary">Parcel Progress</h2>

        <Stepper defaultValue={stepValue} className="flex gap-4">
          {STATUS_ORDER.map((status, idx) => {
            const completed = idx <= currentIndex
            return (
              <StepperItem key={status} step={idx + 1} className="relative flex-1">
                <StepperTrigger className="flex flex-col items-center gap-3 rounded px-2">
                  <motion.div
                    animate={{ scale: completed ? 1.05 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`p-3 rounded-full border-2 ${
                      completed ? "bg-primary text-white border-primary" : "border-muted text-muted-foreground"
                    }`}
                    aria-hidden
                  >
                    {completed ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                  </motion.div>

                  <div className="space-y-0.5 text-center">
                    <StepperTitle className={`font-medium ${completed ? "text-primary" : "text-muted-foreground"}`}>
                      {STATUS_LABELS[status]}
                    </StepperTitle>
                    <StepperDescription className="text-xs text-muted-foreground">
                      {timestampFor(status)}
                    </StepperDescription>
                  </div>
                </StepperTrigger>

                {/* Separator between steps - visual only */}
                {idx < STATUS_ORDER.length - 1 && (
                  <StepperSeparator
                    className={`absolute left-[50%] top-[28px] h-[2px] w-full -z-10 ${idx < currentIndex ? "bg-primary" : "bg-muted"}`}
                  />
                )}
              </StepperItem>
            )
          })}
        </Stepper>

        {/* Cancelled note */}
        {isCancelled && (
          <div className="text-center text-sm text-red-600">
            This parcel was cancelled. Last known status:{" "}
            <span className="font-semibold">{STATUS_LABELS[parcel.statusLog?.[parcel.statusLog.length - 1]?.status as TParcelStatus] || "Unknown"}</span>
          </div>
        )}
      </div>
    </div>
  )
}
