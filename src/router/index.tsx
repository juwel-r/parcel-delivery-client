import App from "@/App";
import { role } from "@/constant/role";
import { checkAuthorization } from "@/utils/checkAuth";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebar } from "./adminSidebar";
import { senderSidebar } from "./senderSidebar";
import { receiverSidebar } from "./receiverSidebar";
import type { TRole } from "@/types";

import { lazy } from "react";
import HomePage from "@/pages/Public/HomePage";

const DashboardLayout = lazy(
  () => import("@/components/Layouts/DashboardLayout")
);
const About = lazy(() => import("@/pages/Public/About"));
const Login = lazy(() => import("@/pages/Public/Login"));
const Registration = lazy(() => import("@/pages/Public/Registration"));
const Unauthorize = lazy(() => import("@/pages/Public/Unauthorize"));
const Contact = lazy(() => import("@/pages/Public/Contact"));
const ParcelTracker = lazy(() => import("@/components/ParcelTracker"));

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: HomePage,
        index: true,
      },
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
      { index: true, element: <Navigate to="/sender/my-parcels" /> },
      ...generateRoutes(senderSidebar),
    ],
  },
  {
    Component: checkAuthorization(DashboardLayout, role.receiver as TRole),
    path: "/receiver",
    children: [
      { index: true, element: <Navigate to="/receiver/incoming-parcel" /> },
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
