import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { 
  IconWallet, 
  IconUsers, 
} from "@tabler/icons-react";
import { useUserInfoQuery } from "@/redux/features/auth/auth";
import { useGetAllUserQuery } from "@/redux/features/user/user";
import { useGetAllAgentQuery } from "@/redux/features/agent/agent";

export default function DashboardStatsCard() {
  const { data: userInfo } = useUserInfoQuery();
  const { data: totalUser } = useGetAllUserQuery(undefined);
  const { data: totalAgent } = useGetAllAgentQuery(undefined);

  const walletBalance = userInfo?.walletId?.balance ?? 0;
  const usersCount = totalUser?.data?.length ?? 0;
  const agentCount = totalAgent?.data?.length ?? 0;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      
      {/* Wallet Balance */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardDescription>Wallet Balance</CardDescription>
          <IconWallet className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <CardTitle className="text-2xl font-bold">
            {walletBalance.toFixed(2)} Tk
          </CardTitle>
        </CardContent>
      </Card>

      {/* Total Users */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardDescription>Total Users</CardDescription>
          <IconUsers className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <CardTitle className="text-2xl font-bold">{usersCount}</CardTitle>
        </CardContent>
      </Card>
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardDescription>Total Agents</CardDescription>
          <IconUsers className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <CardTitle className="text-2xl font-bold">{agentCount}</CardTitle>
        </CardContent>
      </Card>
    </div>
  );
}
