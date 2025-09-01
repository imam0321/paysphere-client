import { lazy } from "react";
import type { ISidebarItem } from "@/types";
import ProfilePage from "@/pages/ProfilePage";
import AllUserPage from "@/pages/Admin/AllUserPage";
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
      {
        title: "All User",
        url: "/admin/user",
        component: AllUserPage,
      },
    ],
  },
];