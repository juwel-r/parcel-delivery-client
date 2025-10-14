import { role } from "@/constant/role";
import { adminSidebar } from "@/router/adminSidebar";
import { receiverSidebar } from "@/router/receiverSidebar";
import { senderSidebar } from "@/router/senderSidebar";
import type { TRole } from "@/types";

export const getSidebarItemsByRole = (userRole: TRole) => {
  switch (userRole) {
    case role.admin:
      return [...adminSidebar];

    case role.sender:
      return [...senderSidebar];

    case role.receiver:
      return [...receiverSidebar];

    default:
      return [];
  }
};
