import { baseApi } from "@/redux/baseApi";
import type { IResponse, ITransactionResponse } from "@/types";

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
  useGetAllTransactionQuery,
  useGetMyTransactionQuery,
  useGetSingleTransactionQuery
} = transactionApi;