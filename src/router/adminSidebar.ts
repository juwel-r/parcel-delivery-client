import AddParcel from "@/pages/Admin/AddParcel";
import AllUsers from "@/pages/Admin/AllUsers";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

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
      {
        title: "Active Users",
        url: "/admin/all-users",
        component: AllUsers,
      },
      {
        title: "Sender Users",
        url: "/admin/all-users",
        component: AllUsers,
      },
      {
        title: "Receiver Users",
        url: "/admin/all-users",
        component: AllUsers,
      },
      {
        title: "Deleted Users",
        url: "/admin/all-users",
        component: AllUsers,
      },
    ],
  },
  {
    title: "Parcel Management",
    items: [
      {
        title: "Add Parcel",
        url: "/admin/add-parcel",
        component: AddParcel,
      },
      {
        title: "All Parcel",
        url: "/admin/add-parcel",
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
