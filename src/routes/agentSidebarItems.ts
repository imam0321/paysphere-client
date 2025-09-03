import ProfilePage from "@/pages/ProfilePage";
import TransactionPage from "@/pages/TransactionPage";
import WalletPage from "@/pages/WalletPage";
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
        title: "My Wallet",
        url: "/agent/wallet",
        component: WalletPage,
      },
      {
        title: "My Transaction",
        url: "/agent/my-transaction",
        component: TransactionPage,
      },
    ],
  },
];