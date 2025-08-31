import { lazy } from "react";
import type { ISidebarItem } from "@/types";
import TransactionPage from "@/pages/TransactionPage";
import ProfilePage from "@/pages/ProfilePage";
const WalletPage = lazy(() => import("@/pages/WalletPage"));

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Profile",
        url: "/user/me",
        component: ProfilePage,
      },
      {
        title: "My Wallet",
        url: "/user/wallet",
        component: WalletPage,
      },
      {
        title: "My Transaction",
        url: "/user/transaction",
        component: TransactionPage,
      },
    ],
  },
];