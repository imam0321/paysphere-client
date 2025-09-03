import DashboardStatsCard from "@/components/modules/Admin/DashboardStatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllTransactionSummaryQuery } from "@/redux/features/transaction/transaction";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  LabelList,
} from "recharts";

const COLORS = [
  "#00C49F",
  "#0088FE",
  "#FFBB28",
  "#FF8042",
  "#AA46BE",
  "#FF6B6B",
  "#2ECC71",
];

export default function Analytics() {
  const { data: transactionSummary, isLoading } =
    useGetAllTransactionSummaryQuery(undefined);

  const summaryData = transactionSummary?.data
    ? [
        { name: "Add", value: transactionSummary.data.totalAddMoney },
        { name: "Fee", value: transactionSummary.data.totalFee },
        { name: "Send", value: transactionSummary.data.totalSendMoney },
        { name: "Receive", value: transactionSummary.data.totalReceiveMoney },
        { name: "Cash In", value: transactionSummary.data.totalCashIn },
        { name: "Cash Out", value: transactionSummary.data.totalCashOut },
        { name: "Withdraw", value: transactionSummary.data.totalWithdraw },
      ]
    : [];

  return (
    <div>
      <DashboardStatsCard />

      {/* Bar Chart */}
      <Card className="w-full max-w-2xl mx-auto mt-6">
        <CardHeader>
          <CardTitle className="font-bold">
            All Transaction Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <div className="h-80 min-w-[400px] flex items-center justify-center">
            {isLoading ? (
              <div className="w-full h-full animate-pulse space-y-4">
                {[...Array(7)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 h-6 rounded"
                    style={{ width: `${50 + index * 10}px` }}
                  />
                ))}
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={summaryData}
                  margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="2 2" />
                  <XAxis dataKey="name" />
                  <YAxis
                    tickFormatter={(v) => v.toLocaleString()}
                    tickCount={5}
                    interval={0}
                  />
                  <Bar dataKey="value">
                    {summaryData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                    <LabelList
                      dataKey="value"
                      position="top"
                      formatter={(v) => v?.toLocaleString()}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
