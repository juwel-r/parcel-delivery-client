import type { IUser } from "../user/user.types";

export interface IParcel {
  trackingId: string;
  sender: string | Partial<IUser>;
  receiver: string | Partial<IUser>;
  pickupAddress: string;
  deliveryAddress: string;
  type: string;
  details: string;
  weight: number;
  fee: number;
  deliveryDate: string;
  currentStatus: TParcelStatus;
  statusLog: IStatusLog[];
  isBlock: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  deliveryConfirmed:Date | string
}

export interface IStatusLog {
  status: TParcelStatus;
  location: string;
  notes?: string;
  updatedBy: string;
  timestamp: Date | string;
}

export type TParcelStatus =
  | "REQUESTED"
  | "APPROVED"
  | "DISPATCHED"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "CANCELLED";
