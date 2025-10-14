import type { ComponentType } from "react";

export type { IUser, IUserRegister, AuthProvider } from "./auth/auth.type";

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


export type TRole =  "ADMIN" | "SENDER" | "RECEIVER";
