import App from "@/App";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import { createBrowserRouter, Navigate } from "react-router";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import { withAuth } from "@/utils/withAuth";
import type { TRole } from "@/types/auth";
import { role } from "@/constants/role";
import { generateRoutes } from "@/utils/generateRoutes";
import { adminSidebarItems } from "./adminSidebarItems";
import { agentSidebarItems } from "./agentSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import Unauthorized from "@/pages/Unauthorized";
import DashboardLayout from "@/components/layout/DashboardLayout";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        index: true,
        Component: HomePage,
        path: "/",
      },
      {
        Component: AboutPage,
        path: "about",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.admin as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.agent as TRole),
    path: "/agent",
    children: [
      { index: true, element: <Navigate to="/agent/me" /> },
      ...generateRoutes(agentSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.user as TRole),
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/wallet" /> },
      ...generateRoutes(userSidebarItems),
    ],
  },
  {
    Component: LoginPage,
    path: "login",
  },
  {
    Component: RegisterPage,
    path: "/register/:role",
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
  },
]);
