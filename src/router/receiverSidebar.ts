import { lazy } from "react";
const DeliveryHistory = lazy(() => import("@/pages/Receiver/ReceivedParcels"));
const IncomingParcels = lazy(() => import("@/pages/Receiver/IncomingParcels"));
import type { ISidebarItem } from "@/types";

export const receiverSidebar: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Incoming Parcels",
        url: "/receiver/incoming-parcel",
        component: IncomingParcels,
      },
      {
        title: "Received Parcel",
        url: "/receiver/delivery-history",
        component: DeliveryHistory,
      },
    ],
  },
];
