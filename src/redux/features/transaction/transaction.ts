import { baseApi } from "@/redux/baseApi";
import type { IResponse, ITransactionResponse } from "@/types";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyTransaction: builder.query<ITransactionResponse[], unknown>({
      query: (params) => ({
        url: "/transaction/my-transaction",
        method: "GET",
        params
      }),
      providesTags: ["TRANSACTION"],
      transformResponse: (res: IResponse<ITransactionResponse[]>) => res.data
    }),
    getSingleTransaction: builder.query<ITransactionResponse, unknown>({
      query: (id) => ({
        url: `/transaction/${id}`,
        method: "GET",
      }),
      providesTags: ["TRANSACTION"],
      transformResponse: (res: IResponse<ITransactionResponse>) => res.data
    })

  }),
});

export const {
  useGetMyTransactionQuery,
  useGetSingleTransactionQuery
} = transactionApi;