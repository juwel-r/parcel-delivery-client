import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const CreateParcel = lazy(() => import("@/pages/Sender/CreateParcel"));
const SenderParcels = lazy(() => import("@/pages/Sender/SenderParcels"));

export const senderSidebar: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "My Parcels",
        url: "/sender/my-parcels",
        component: SenderParcels,
      },
      {
        title: "Create Parcel",
        url: "/sender/create-parcel",
        component: CreateParcel,
      },
    ],
  },
];
