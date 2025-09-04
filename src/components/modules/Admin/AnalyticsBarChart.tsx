import { useGetAllTransactionSummaryQuery } from "@/redux/features/transaction/transaction";


export default function AnalyticsBarChart() {
  const { data: transactionSummary, isLoading } = useGetAllTransactionSummaryQuery(undefined);

 

  return (
    <>
    
    </>
  );
}
