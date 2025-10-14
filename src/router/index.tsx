import App from "@/App";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { role } from "@/constant/role";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Registration from "@/pages/Registration";
import Unauthorize from "@/pages/Unauthorize";
import { checkAuthorization } from "@/utils/checkAuth";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter,Navigate } from "react-router";
import { adminSidebar } from "./adminSidebar";
import type { TRole } from "@/types";
import { senderSidebar } from "./senderSidebar";
import { receiverSidebar } from "./receiverSidebar";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: About,
        path: "about",
      },
    ],
  },
    {
    Component: checkAuthorization(DashboardLayout, role.admin as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebar),
    ],
  },

  {
    Component: checkAuthorization(DashboardLayout, role.sender as TRole),
    path: "/sender",
    children: [
      { index: true, element: <Navigate to="/sender/send-parcel" /> },
      ...generateRoutes(senderSidebar),
    ],
  },
  {
    Component: checkAuthorization(DashboardLayout, role.receiver as TRole),
    path: "/receiver",
    children: [
      { index: true, element: <Navigate to="/receiver/receive-parcel" /> },
      ...generateRoutes(receiverSidebar),
    ],
  },

  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Registration,
    path: "/registration",
  },
  {
    Component: Unauthorize,
    path: "/unauthorize",
  },
]);
