export interface IParcel {
  trackingId: string
  sender: string
  receiver: string
  pickupAddress: string
  deliveryAddress: string
  type: string
  details: string
  weight: number
  fee: number
  deliveryDate: string
  currentStatus: string
  statusLog: IStatusLog[]
  isBlock: boolean
  _id: string
  createdAt: string
  updatedAt: string
}

export interface IStatusLog {
  status: TParcelStatus;
  location: string;
  notes?: string;
  updatedBy: string;
  timestamp: Date;
}

export type TParcelStatus ="REQUESTED"|"APPROVED"|"DISPATCHED"|"IN_TRANSIT"|"DELIVERED"|"CANCELLED"
