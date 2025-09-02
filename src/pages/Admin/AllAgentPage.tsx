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
import { Button } from "@/components/ui/button";
import {
  useBlockedWalletMutation,
  useUnblockedWalletMutation,
} from "@/redux/features/wallet/wallet";
import { useApprovedAgentMutation, useGetAllAgentQuery, useSuspendedAgentMutation } from "@/redux/features/agent/agent";
import PaginationComponent from "@/components/modules/HelperComponents/PaginationComponent";
import { Input } from "@/components/ui/input";
import WalletActionButton from "@/components/modules/HelperComponents/WalletActionButton";
import ApprovalActionButton from "@/components/modules/HelperComponents/ApprovalActionButton";

export default function AllAgentPage() {
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

  const { data: userData, isLoading } = useGetAllAgentQuery({
    page,
    limit,
    searchTerm: appliedSearch,
  });

  const [blockedWallet] = useBlockedWalletMutation();
  const [unblockedWallet] = useUnblockedWalletMutation();

  const [approvedAgent] = useApprovedAgentMutation();
  const [suspendedAgent] = useSuspendedAgentMutation();

  const agents = userData?.data || [];
  const meta = userData?.meta;

  const handleBlockAgent = async (id: string) => {
    const res = await blockedWallet(id).unwrap();
    console.log(res);
  };

  const handleUnblockAgent = async (id: string) => {
    const res = await unblockedWallet(id).unwrap();
    console.log(res);
  };
  
  const handleSuspendedAgent = async (id: string) => {
    const res = await suspendedAgent(id).unwrap();
    console.log(res);
  };

  const handleApprovedAgent = async (id: string) => {
    const res = await approvedAgent(id).unwrap();
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
            <Input
              placeholder="Search name or phone ...."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[200px]"
            />
            <Button onClick={() => setAppliedSearch(searchTerm)} disabled={!searchTerm.trim()}>Search</Button>
          </div>

          {/* Table */}
          <Table className="border-y">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Wallet Status</TableHead>
                <TableHead>Agent Approval</TableHead>
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
              ) : agents.length > 0 ? (
                agents.map((tx) => (
                  <TableRow key={tx._id}>
                    <TableCell>{tx.name}</TableCell>
                    <TableCell>{tx.phone}</TableCell>
                    <TableCell>{tx?.walletId?.balance?.toFixed(2)}</TableCell>
                    <TableCell>
                      <WalletActionButton
                        walletId={tx.walletId?._id as string}
                        status={tx.walletId?.status as "active" | "blocked"}
                        onBlock={handleBlockAgent}
                        onUnblock={handleUnblockAgent}
                      />
                    </TableCell>
                    <TableCell>
                      <ApprovalActionButton
                        agentId={tx._id}
                        isApproved={tx.isApproved}
                        onApprove={handleApprovedAgent}
                        onSuspend={handleSuspendedAgent}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500">
                    No agents found.
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
