import { lazy } from "react";
import type { ISidebarItem } from "@/types";
import ProfilePage from "@/pages/ProfilePage";
const Analytics = lazy(() => import("@/pages/Admin/Analytics"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Profile",
        url: "/admin/me",
        component: ProfilePage,
      },
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
];