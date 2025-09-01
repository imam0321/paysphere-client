import { baseApi } from "@/redux/baseApi";
import type { IAddMoney, IMoneyResponse, IResponse, IWalletResponse } from "@/types";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleWallet: builder.query<IWalletResponse, string>({
      query: (id) => ({
        url: `/wallet/${id}`,
        method: "GET",
      }),
      providesTags: ["WALLET", "TRANSACTION"],
      transformResponse: (res: IResponse<IWalletResponse>) => res.data
    }),

    addMoney: builder.mutation<IResponse<IMoneyResponse>, IAddMoney>({
      query: (amount) => ({
        url: "/wallet/add-money",
        method: "POST",
        data: amount,
      }),
      invalidatesTags: ["WALLET", "TRANSACTION"],
    }),
    sendMoney: builder.mutation({
      query: (sendMoneyData) => ({
        url: "/wallet/send",
        method: "POST",
        data: sendMoneyData,
      }),
      invalidatesTags: ["WALLET", "TRANSACTION"],
    }),
    withdrawMoney: builder.mutation({
      query: (withdrawMoneyData) => ({
        url: "/wallet/cash-out",
        method: "POST",
        data: withdrawMoneyData,
      }),
      invalidatesTags: ["WALLET", "TRANSACTION"],
    }),
    cashIn: builder.mutation({
      query: (cashInData) => ({
        url: "/wallet/cash-in",
        method: "POST",
        data: cashInData,
      }),
      invalidatesTags: ["WALLET", "TRANSACTION"],
    }),
    blockedWallet: builder.mutation<IResponse<IWalletResponse>, string>({
      query: (id) => ({
        url: `/wallet/block/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["USER","WALLET", "TRANSACTION"],
    }),
    unblockedWallet: builder.mutation<IResponse<IWalletResponse>, string>({
      query: (id) => ({
        url: `/wallet/unblock/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["USER","WALLET", "TRANSACTION"],
    }),

  }),
});

export const {
  useGetSingleWalletQuery,
  useAddMoneyMutation,
  useSendMoneyMutation,
  useWithdrawMoneyMutation,
  useCashInMutation, 
  useBlockedWalletMutation,
  useUnblockedWalletMutation
} = walletApi;