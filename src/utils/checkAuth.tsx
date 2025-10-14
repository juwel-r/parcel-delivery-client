import { useUserInfoQuery } from "@/redux/features/auth/authApi";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate, useLocation } from "react-router";

export const checkAuthorization = (Component: ComponentType, role?: TRole) => {
  return function AuthWrapper() {
    const location = useLocation();

    const { data, isLoading } = useUserInfoQuery();

    if (!isLoading && !data?.role) {
      return <Navigate to="/login" state={location.pathname} />;
    }

    if (!isLoading && role && role !== data?.role) {
      return <Navigate to="/unauthorize" />;
    }
    return <Component />;
  };
};
