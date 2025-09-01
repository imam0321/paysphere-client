import DashboardStatsCard from "@/components/modules/Admin/DashboardStatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Cash In", amount: 12000 },
  { name: "Cash Out", amount: 8000 },
  { name: "Send Money", amount: 5000 },
  { name: "Receive Money", amount: 7000 },
  { name: "Fee", amount: 1200 },
];

export default function Analytics() {
  const total = data.reduce((acc, item) => acc + item.amount, 0);
  return (
    <div>
      <DashboardStatsCard />

      <div className="my-5">
        <Card className="w-full max-w-3xl mx-auto shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-center">Agent Wallet Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-4">
              <p className="text-lg font-semibold">
                Total Transactions:{" "}
                <span className="text-blue-600">{total}৳</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
