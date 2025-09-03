import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllTransactionQuery } from "@/redux/features/transaction/transaction";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import PaginationComponent from "@/components/modules/HelperComponents/PaginationComponent";

export default function AllTransactionPage() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 8;

  const { data: transactionData, isLoading } = useGetAllTransactionQuery({
    page,
    limit,
    type: typeFilter === "all" ? undefined : typeFilter,
  });

  const transactions = transactionData?.data || [];
  const meta = transactionData?.meta;

  return (
    <div className="w-full max-w-3xl mx-auto py-2">
      <Card>
        <CardHeader>
          <CardTitle>All Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-4">
            <Select
              value={typeFilter}
              onValueChange={(value) => {
                setTypeFilter(value);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="fee">Fee</SelectItem>
                <SelectItem value="add_money">Add Money</SelectItem>
                <SelectItem value="withdraw">Withdraw</SelectItem>
                <SelectItem value="send_money">Send Money</SelectItem>
                <SelectItem value="cash_in">Cash In</SelectItem>
                <SelectItem value="cash_out">Cash Out</SelectItem>
                <SelectItem value="receive_money">Receive Money</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <Table className="border-y">
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Balance After</TableHead>
                <TableHead>From Wallet</TableHead>
                <TableHead>To Wallet</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                // Skeleton Rows
                [...Array(6)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                  </TableRow>
                ))
              ) : transactions.length > 0 ? (
                transactions.map((tx) => (
                  <TableRow key={tx._id}>
                    <TableCell>
                      {format(new Date(tx.createdAt), "PP, hh:mm a")}
                    </TableCell>
                    <TableCell>{tx.type}</TableCell>
                    <TableCell>{tx.amount.toFixed(2)}</TableCell>
                    <TableCell>{tx.currentBalance.toFixed(2)}</TableCell>
                    <TableCell>
                      {tx?.fromWalletId?.userId?.phone || "Self"}
                    </TableCell>
                    <TableCell>{tx?.toWalletId?.userId?.phone}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {!isLoading && meta && meta.totalPage > 1 && (
            <PaginationComponent
              currentPage={page}
              totalPages={meta.totalPage}
              onPageChange={(p) => setPage(p)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
