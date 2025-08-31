import AnalyticsPage from "@/pages/Agent/AnalyticsPage";
import ProfilePage from "@/pages/ProfilePage";
import type { ISidebarItem } from "@/types";

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Profile",
        url: "/agent/me",
        component: ProfilePage,
      },
      {
        title: "Analytics",
        url: "/agent/analytics",
        component: AnalyticsPage,
      },
    ],
  },
];