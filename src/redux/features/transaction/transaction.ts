import { baseApi } from "@/redux/baseApi";
import type { IResponse, ITransactionAmountResponse, ITransactionResponse, ITransactionSummaryResponse } from "@/types";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransaction: builder.query<IResponse<ITransactionResponse[]>, unknown>({
      query: (params) => ({
        url: "/transaction",
        method: "GET",
        params
      }),
      providesTags: ["TRANSACTION"],
    }),
    
    getMyTransaction: builder.query<IResponse<ITransactionResponse[]>, unknown>({
      query: (params) => ({
        url: "/transaction/my-transaction",
        method: "GET",
        params
      }),
      providesTags: ["TRANSACTION"],
    }),

    getMyTransactionAmount: builder.query<IResponse<ITransactionAmountResponse>, unknown>({
      query: () => ({
        url: "/stats/transaction-amount",
        method: "GET",
      }),
      providesTags: ["TRANSACTION"],
    }),

    getAllTransactionSummary: builder.query<IResponse<ITransactionSummaryResponse>, unknown>({
      query: () => ({
        url: "/stats/transaction-summary",
        method: "GET",
      }),
      providesTags: ["TRANSACTION"],
    }),

  }),
});

export const {
  useGetAllTransactionQuery,
  useGetMyTransactionQuery,
  useGetMyTransactionAmountQuery,
  useGetAllTransactionSummaryQuery,
} = transactionApi;