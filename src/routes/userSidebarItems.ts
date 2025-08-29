import { lazy } from "react";
import type { ISidebarItem } from "@/types";
const WalletPage = lazy(() => import("@/pages/WalletPage"));

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Wallet",
        url: "/user/wallet",
        component: WalletPage,
      },
    ],
  },
];