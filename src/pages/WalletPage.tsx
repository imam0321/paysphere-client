import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldCheck, Wallet } from "lucide-react";
import { useUserInfoQuery } from "@/redux/features/auth/auth";
import { useGetMyTransactionQuery } from "@/redux/features/transaction/transaction";
import Stat from "@/components/modules/Home/Stat";
import QuickAction from "@/components/modules/Home/QuickAction";
import TxRow from "@/components/modules/Home/TxRow";
import AddMoney from "@/components/modules/User/AddMoney";

export default function WalletPage() {
  const { data } = useUserInfoQuery(undefined);
  const { data: myTransaction } = useGetMyTransactionQuery(undefined);

  return (
    <div className="w-full max-w-2xl mx-auto py-">
      <div className="relative">
        <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-fuchsia-500/20 blur-2xl" />
        <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-violet-500/20 blur-2xl" />
        <Card className="rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" /> Wallet
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-3 gap-3">
              <Stat label="Balance" value={data?.walletId?.balance || 0} />
              <Stat label="Last Month Spend" value={0} />
              <Stat label="Rewards" value={0} />
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {data?.role === "user" && <AddMoney />}
              <QuickAction
                icon={<Wallet className="h-4 w-4" />}
                label="Add Money"
              />
              <QuickAction
                icon={<ShieldCheck className="h-4 w-4" />}
                label="Withdraw"
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Recent transactions</p>
              <div className="grid gap-2">
                {(myTransaction?.length ?? 0) > 0 ? (
                  myTransaction
                    ?.slice(0, myTransaction.length === 1 ? 1 : 10)
                    .map((tx) => (
                      <TxRow key={tx._id} label={tx.type} amount={tx.amount} />
                    ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No transactions found
                  </p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="sr-only">data for illustration.</CardFooter>
        </Card>
      </div>
    </div>
  );
}
