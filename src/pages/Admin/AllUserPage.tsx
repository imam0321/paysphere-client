import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllUserQuery } from "@/redux/features/user/user";
import { Button } from "@/components/ui/button";
import {
  useBlockedWalletMutation,
  useUnblockedWalletMutation,
} from "@/redux/features/wallet/wallet";
import PaginationComponent from "@/components/modules/HelperComponents/PaginationComponent";
import { Input } from "@/components/ui/input";
import WalletActionButton from "@/components/modules/HelperComponents/WalletActionButton";

export default function AllUserPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    if (searchTerm === "") {
      setAppliedSearch("");
      setPage(1);
    }
  }, [searchTerm]);

  const { data: userData, isLoading } = useGetAllUserQuery({
    page,
    limit,
    searchTerm: appliedSearch,
  });

  const [blockedWallet] = useBlockedWalletMutation();
  const [unblockedWallet] = useUnblockedWalletMutation();

  const users = userData?.data || [];
  const meta = userData?.meta;

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
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-4">
            <Input
              placeholder="Search name or phone ...."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[200px]"
            />
            <Button
              onClick={() => setAppliedSearch(searchTerm)}
              disabled={!searchTerm.trim()}
            >
              Search
            </Button>
          </div>

          {/* Table */}
          <Table className="border-y">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Wallet Status</TableHead>
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
              ) : users.length > 0 ? (
                users.map((tx) => (
                  <TableRow key={tx._id}>
                    <TableCell>{tx.name}</TableCell>
                    <TableCell>{tx.phone}</TableCell>
                    <TableCell>{tx?.walletId?.balance?.toFixed(2)}</TableCell>
                    <TableCell>
                      <WalletActionButton
                        walletId={tx.walletId?._id as string}
                        status={tx.walletId?.status as "active" | "blocked"}
                        onBlock={handleBlockUser}
                        onUnblock={handleUnblockUser}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500">
                    No users found.
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
