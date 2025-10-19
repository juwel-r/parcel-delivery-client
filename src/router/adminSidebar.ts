import { lazy } from "react";
const AddParcel = lazy(()=>import("@/pages/Admin/AllParcels"));
const AllUsers = lazy(()=>import("@/pages/Admin/AllUsers"));
import type { ISidebarItem } from "@/types";
const Analytics = lazy(() => import("@/pages/Admin/Analytics"));

export const adminSidebar: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "All Users",
        url: "/admin/all-users",
        component: AllUsers,
      },
    ],
  },
  {
    title: "Parcel Management",
    items: [
      {
        title: "All Parcel",
        url: "/admin/all-parcel",
        component: AddParcel,
      },
      {
        title: "Delivered Parcel",
        url: "/admin/add-parcel",
        component: AddParcel,
      },
      {
        title: "Canceled Parcel",
        url: "/admin/add-parcel",
        component: AddParcel,
      },
    ],
  },
];
