import { lazy } from "react";
import type { ISidebarItem } from "@/types";
import TransactionPage from "@/pages/TransactionPage";
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
      {
        title: "Transaction History",
        url: "/user/transaction",
        component: TransactionPage,
      },
    ],
  },
];