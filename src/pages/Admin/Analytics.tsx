import DashboardStatsCard from "@/components/modules/Admin/DashboardStatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetMyTransactionQuery } from "@/redux/features/transaction/transaction";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Analytics() {
  const { data: myTransaction } = useGetMyTransactionQuery({ limit: 1000, fields: "type,amount"});

  const transactions = myTransaction?.data || [];

  console.log(transactions)

  const totalFee = transactions
    .filter((t) => t.type === "fee")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSendMoney = transactions
    .filter((t) => t.type === "send_money")
    .reduce((sum, t) => sum + t.amount, 0);


  
  const chartData = [
    { name: "Fee", amount: totalFee },
    { name: "Send Money", amount: totalSendMoney },
  ];


  return (
    <div>
      <DashboardStatsCard />

      <div className="my-5">
        <Card className="w-full max-w-lg mx-auto shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-center">Admin Wallet Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-50">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
