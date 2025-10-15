import IncomingParcels from "@/pages/Receiver/IncomingParcels";
import type { ISidebarItem } from "@/types";

export const receiverSidebar: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Receive Parcel",
        url: "/receiver/receive-parcel",
        component: IncomingParcels,
      },
    ],
  },
];
