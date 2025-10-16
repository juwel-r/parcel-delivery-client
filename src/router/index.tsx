import App from "@/App";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { role } from "@/constant/role";
import About from "@/pages/Public/About";
import Login from "@/pages/Public/Login";
import Registration from "@/pages/Public/Registration";
import Unauthorize from "@/pages/Public/Unauthorize";
import { checkAuthorization } from "@/utils/checkAuth";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebar } from "./adminSidebar";
import { senderSidebar } from "./senderSidebar";
import { receiverSidebar } from "./receiverSidebar";
import Contact from "@/pages/Public/Contact";
import type { TRole } from "@/types";
import ParcelTracker from "@/components/ParcelTracker";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: About,
        path: "about",
      },
      {
        Component: Contact,
        path: "contact",
      },
        {
    Component: ParcelTracker,
    path: "tracking/:trackingId",
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
      { index: true, element: <Navigate to="/sender/create-parcel" /> },
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
