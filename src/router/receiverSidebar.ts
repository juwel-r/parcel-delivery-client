import ReceiveParcel from "@/pages/Receiver/ReceiveParcel";
import type { ISidebarItem } from "@/types";


export const receiverSidebar: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Receive Parcel",
        url: "/receiver/receive-parcel",
        component: ReceiveParcel,
      },
    ],
  },

];
