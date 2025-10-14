import SendParcel from "@/pages/Sender/SendParcel";
import type { ISidebarItem } from "@/types";


export const senderSidebar: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Send Parcel",
        url: "/sender/send-parcel",
        component: SendParcel,
      },
    ],
  },

];