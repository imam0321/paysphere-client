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


  }),
});

export const {
  useGetSingleWalletQuery,
  useAddMoneyMutation
} = walletApi;