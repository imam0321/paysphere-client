import AnalyticsPage from "@/pages/Agent/AnalyticsPage";
import type { ISidebarItem } from "@/types";

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/agent/analytics",
        component: AnalyticsPage,
      },
    ],
  },
];