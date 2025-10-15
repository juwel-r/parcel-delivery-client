
import { CreateParcel } from "@/pages/Sender/CreateParcel";
import MyParcels from "@/pages/Sender/MyParcels";
import type { ISidebarItem } from "@/types";

export const senderSidebar: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Create Parcel",
        url: "/sender/create-parcel",
        component: CreateParcel,
      },
      {
        title: "My Parcels",
        url: "/sender/my-parcels",
        component: MyParcels,
      },
    ],
  },
];
