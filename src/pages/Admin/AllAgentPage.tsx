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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserInfoQuery } from "@/redux/features/auth/auth";
import { role } from "@/constants/role";
import { Button } from "@/components/ui/button";
import {
  useBlockedWalletMutation,
  useUnblockedWalletMutation,
} from "@/redux/features/wallet/wallet";
import { useGetAllAgentQuery } from "@/redux/features/agent/agent";

export default function AllAgentPage() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data: userInfo } = useUserInfoQuery();
  const { data: userData, isLoading } = useGetAllAgentQuery({
    page,
    limit,
  });

  const [blockedWallet] = useBlockedWalletMutation();
  const [unblockedWallet] = useUnblockedWalletMutation();

  const transactions = userData?.data || [];
  const meta = userData?.meta;

  const filteredTransactions =
    typeFilter === "all"
      ? transactions
      : transactions.filter((t) => t.walletId?.status === typeFilter);

  const handleBlockUser = async (id: string) => {
    const res = await blockedWallet(id).unwrap();
    console.log(res);
  };

  const handleUnblockUser = async (id: string) => {
    const res = await unblockedWallet(id).unwrap();
    console.log(res);
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-2">
      <Card>
        <CardHeader>
          <CardTitle>All Agent</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-4">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {(userInfo?.role === role.user ||
                  userInfo?.role === role.admin) && (
                  <>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <Table className="border-y">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Wallet Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                [...Array(5)].map((_, i) => (
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
                  </TableRow>
                ))
              ) : filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => (
                  <TableRow key={tx._id}>
                    <TableCell>{tx.name}</TableCell>
                    <TableCell>{tx.phone}</TableCell>
                    <TableCell>{tx?.walletId?.balance?.toFixed(2)}</TableCell>
                    <TableCell>{tx.walletId?.status}</TableCell>
                    <TableCell>
                      {tx.walletId?.status === "active" ? (
                        <Button
                          size="sm"
                          className="bg-primary"
                          onClick={() =>
                            handleBlockUser(tx?.walletId?._id as string)
                          }
                        >
                          Block
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="bg-muted-foreground"
                          onClick={() =>
                            handleUnblockUser(tx?.walletId?._id as string)
                          }
                        >
                          Active
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500">
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {!isLoading && meta && meta.totalPage > 1 && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (page > 1) setPage(page - 1);
                    }}
                    className={
                      page === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {[...Array(meta.totalPage)].map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href="#"
                        isActive={page === pageNumber}
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(pageNumber);
                        }}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (page < meta.totalPage) setPage(page + 1);
                    }}
                    className={
                      page === meta.totalPage
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
