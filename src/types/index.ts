import type { ComponentType } from "react";

export type { IUserRegister } from "./auth/auth.type";
export type { IUser, TRole, AuthProvider, TIsActive } from "./user/user.types";
export type { IParcel, IStatusLog, TParcelStatus } from "./parcel/parcel.types";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: Meta;
}

export interface Meta {
  page: number;
  limit: number;
  totalPage: number;
  total: number;
  loaded: number;
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}
